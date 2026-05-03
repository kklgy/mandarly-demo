# Mandarly Demo

> 在线中文 1v1 培训平台 · 产品演示版本
> Demo for an online Mandarin 1-on-1 tutoring platform

## 功能 Features

- 教师列表卡片（Cambly 风格）
- 中英双语切换（自动识别浏览器语言）
- 课堂页 LCIC iframe 嵌入
- 角色切换（学生 / 老师）
- 响应式 PC + H5

## 在线访问 Live

启用 GitHub Pages 后访问：
https://kklgy.github.io/mandarly-demo

## 技术栈

纯静态：HTML + CSS + Vanilla JavaScript
视频课堂：腾讯云 LCIC（低代码互动课堂）

## 注意事项

- LCIC 演示链接 token 有效期至 **2026-05-11**
- 过期需重新在腾讯云 LCIC 控制台生成并替换 `assets/js/classroom.js` 中的 `LCIC_URLS`
- 请勿将 token 公开传播

## 本地预览

```bash
cd mandarly-demo
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 部署

push 到 GitHub 仓库后，在 Settings → Pages 选择 `main` 分支根目录即可。
