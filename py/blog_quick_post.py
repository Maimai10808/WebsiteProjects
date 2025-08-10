import subprocess
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
import re
import datetime

def make_markdown(data, filepath):
    # 处理category和tags为YAML格式
    def yaml_list(key, items):
        if not items:
            return f"{key}: []"
        s = f"{key}:\n"
        for item in items:
            s += f"  - {item}\n"
        return s.rstrip()

    # 处理自定义字段
    custom_lines = []
    for field in data.get('custom', []):
        k = field.get('type', '').strip()
        v = field.get('value', '').strip()
        if k and v:
            custom_lines.append(f"{k}: {v}")

    # 日期
    today = datetime.date.today().isoformat()
    # 组装markdown
    md = ["---"]
    md.append(f"title: {data.get('title','')}")
    md.append(f"date: {today}")
    md.append("lang: zh")
    md.append(yaml_list("category", [data.get('category','')]))
    md.append(yaml_list("tags", data.get('tags', [])))
    md.extend(custom_lines)
    md.append("---\n")
    md.append(data.get('content',''))
    md_str = '\n'.join(md)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(md_str)
    return filepath



# 标签输入与动态添加
tags_list = []  # 存储所有标签

def refresh_tags_display():
    for widget in tags_display_frame.winfo_children():
        widget.destroy()
    for idx, tag in enumerate(tags_list):
        tag_label = ttk.Label(tags_display_frame, text=tag, relief='groove', padding=(4,2))
        tag_label.grid(row=0, column=idx*2, padx=2, pady=2)
        del_btn = ttk.Button(tags_display_frame, text="-", width=2, command=lambda i=idx: remove_tag(i))
        del_btn.grid(row=0, column=idx*2+1, padx=(0,6), pady=2)

def add_tag():
    tag = tag_input_var.get().strip()
    if tag and tag not in tags_list:
        tags_list.append(tag)
        tag_input_var.set("")
        refresh_tags_display()

def remove_tag(idx):
    tags_list.pop(idx)
    refresh_tags_display()

def get_form_data():
    data = {
        'title': title_var.get(),
        'tags': tags_list[:],
        'category': category_var.get(),
        'custom': [],
        'content': content_text.get('1.0', 'end').rstrip(),
    }
    for label_var, label_entry, var, entry, minus_btn in custom_fields:
        label = label_var.get().strip()
        value = var.get().strip()
        if label:
            data['custom'].append({'type': label, 'value': value})
    return data




root = tk.Tk()
root.title("博客快速发布界面")
root.geometry("600x500")


# 第一行文本框（标题+标签）
frame1 = ttk.Frame(root)
frame1.pack(pady=10, padx=10, fill='x')
ttk.Label(frame1, text="标题:").grid(row=0, column=0, sticky='e')
title_var = tk.StringVar()
ttk.Entry(frame1, textvariable=title_var, width=25).grid(row=0, column=1, padx=5)

# 标签输入框和+按钮
ttk.Label(frame1, text="标签:").grid(row=0, column=2, sticky='e')
tag_input_var = tk.StringVar()
tag_entry = ttk.Entry(frame1, textvariable=tag_input_var, width=18)
tag_entry.grid(row=0, column=3, padx=2)
add_tag_btn = ttk.Button(frame1, text="+", width=2, command=add_tag)
add_tag_btn.grid(row=0, column=4, padx=2)

# 标签显示区域
tags_display_frame = ttk.Frame(root)
tags_display_frame.pack(padx=10, anchor='w')
refresh_tags_display()

# 第二行文本框（分类）
frame2 = ttk.Frame(root)
frame2.pack(pady=5, padx=10, fill='x')
ttk.Label(frame2, text="分类:").grid(row=0, column=0, sticky='e')
category_var = tk.StringVar()
ttk.Entry(frame2, textvariable=category_var, width=25).grid(row=0, column=1, padx=5)

# 动态添加自定义类型输入框，每个新输入框单独一行
custom_frame = ttk.Frame(root)
custom_frame.pack(pady=5, padx=10, fill='x')
custom_fields = []

def remove_custom_field(idx):
    label_var, label_entry, var, entry, minus_btn = custom_fields[idx]
    label_entry.destroy()
    entry.destroy()
    minus_btn.destroy()
    custom_fields.pop(idx)
    # 重新布局剩余的行
    for i, (lvar, lentry, v, ent, btn) in enumerate(custom_fields):
        lentry.grid_configure(row=i)
        ent.grid_configure(row=i)
        btn.grid_configure(row=i)

def add_custom_field():
    idx = len(custom_fields)
    row = idx
    label_var = tk.StringVar(value=f"类型{idx+1}")
    label_entry = ttk.Entry(custom_frame, textvariable=label_var, width=8)
    label_entry.grid(row=row, column=0, sticky='e', padx=2, pady=2)
    var = tk.StringVar()
    entry = ttk.Entry(custom_frame, textvariable=var, width=25)
    entry.grid(row=row, column=1, padx=5, pady=2)
    minus_btn = ttk.Button(custom_frame, text="-", width=2, command=lambda i=row: remove_custom_field(i))
    minus_btn.grid(row=row, column=2, padx=2, pady=2)
    custom_fields.append((label_var, label_entry, var, entry, minus_btn))

# +按钮放在自定义输入框区域下方
add_btn = ttk.Button(custom_frame, text="+", width=2, command=add_custom_field)
add_btn.grid(row=99, column=0, columnspan=2, pady=4)

# ...existing code...

# 大的内容输入框
ttk.Label(root, text="博客内容（Markdown 格式）:").pack(anchor='w', padx=10, pady=(10,0))
content_text = tk.Text(root, height=15, wrap='word')
content_text.pack(padx=10, fill='both', expand=True)




def on_ok():
    data = get_form_data()
    # 固定保存文件夹
    import os
    blog_dir = "/Users/mac/Documents/hexo-blog/source/_posts"
    if not os.path.exists(blog_dir):
        os.makedirs(blog_dir)
    # 用标题作为文件名，去除特殊字符和空格
    title = data.get('title', '').strip()
    if title:
        safe_title = re.sub(r'[^\w\u4e00-\u9fa5-]', '_', title)
        filename = f"{safe_title}.md"
    else:
        filename = "output.md"
    filepath = os.path.join(blog_dir, filename)
    make_markdown(data, filepath)

    # 进度条弹窗
    progress_win = tk.Toplevel(root)
    progress_win.title("正在部署博客...")
    progress_win.geometry("300x80")
    progress_win.resizable(False, False)
    ttk.Label(progress_win, text="正在部署博客，请稍候...").pack(pady=10)
    pb = ttk.Progressbar(progress_win, mode='indeterminate')
    pb.pack(padx=20, pady=5, fill='x')
    pb.start(10)
    progress_win.grab_set()
    progress_win.update()

    def after_deploy():
        pb.stop()
        progress_win.destroy()
        def close_and_exit():
            root.destroy()
        if code == 0:
            messagebox.showinfo("提示", f"内容已提交并已生成 {filepath}\n博客已自动更新！")
            root.after(100, close_and_exit)
        else:
            messagebox.showwarning("警告", f"内容已提交并已生成 {filepath}\n但博客自动更新失败：{err}")
            root.after(100, close_and_exit)

    def run_deploy():
        nonlocal code, out, err
        code, out, err = deploy_hexo()
        root.after(100, after_deploy)

    def deploy_hexo():
        cmd = "cd /Users/mac/Documents/hexo-blog && hexo clean && hexo g -d"
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.returncode, result.stdout, result.stderr

    code = out = err = None
    root.after(100, run_deploy)

ttk.Button(root, text="OK", command=on_ok).pack(pady=15)


root.mainloop()
