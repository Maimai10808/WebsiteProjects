
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




