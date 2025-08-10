import subprocess

def deploy_hexo():
    cmd = "cd /Users/mac/Documents/hexo-blog && hexo clean && hexo g -d"
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(result.stdout)
    if result.returncode == 0:
        print("Hexo 部署成功")
    else:
        print("Hexo 部署失败:", result.stderr)

# 调用
deploy_hexo()
