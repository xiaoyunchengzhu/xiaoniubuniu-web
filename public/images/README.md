# 图片资源目录结构

```
public/images/
├── common/                  # 全站通用图片（头像、二维码、Logo）
│   ├── photo-work.jpg       # 关于页 — 个人工作场景照片
│   ├── qrcode-wechat.jpg    # 关于页 — 公众号二维码
│   └── qrcode-wechat-contact.jpg  # 联系页 — 微信二维码
├── products/                # 产品配图
│   └── purepaste/           # PurePaste 产品截图 & 演示
│       ├── demo.gif         # PasteFlow 功能演示
│       ├── url-detect.png   # URL 识别截图
│       ├── color-detect.png # 颜色识别截图
│       ├── math-detect.png  # 数学计算截图
│       ├── history.png      # 意图历史截图
│       ├── menubar.png      # 菜单栏截图
│       └── overview.png     # 产品总览截图
├── blog/                    # 博客文章配图（按文章 slug 建子目录）
│   └── .gitkeep
└── README.md
```

## 命名规范

- **产品图片**：`public/images/products/<产品名>/<描述>.png|gif`
- **博客图片**：`public/images/blog/<文章slug>/<描述>.png`
- **通用图片**：`public/images/common/<用途>.jpg|png`

图片在 Markdown 和代码中使用绝对路径：
`https://www.xiaoniubuniu.com/images/<分类>/<文件名>`
