# 教务系统密码自动填充修复

修复正方教务管理系统登录页（https://jwglxxfwpt.hebeu.edu.cn/xtgl/login_slogin.html）
因开发者有意禁用自动填充而导致的密码管理器无法工作的问题。

## 工作原理

该页面使用了几种 anti-autofill 手段阻止密码管理器自动填充：

1. 密码框初始为 `type="text"`，聚焦后才改为 `type="password"`
2. 用户名框和密码框均设置 `autocomplete="off"`
3. 表单中放置了多个隐藏的迷惑性密码框

本扩展在页面加载时自动执行以下修复：

- 将密码框立即改为 `type="password"`
- 替换 `autocomplete` 为正确的值（`username` / `current-password`）
- 移除隐藏的重复密码框

修复后，Edge 内置密码管理器、Bitwarden 等均可正常识别并自动填充。

## 安装方法（Edge / Chrome）

1. 打开浏览器，进入扩展管理页面：
   - **Edge:** 地址栏输入 `edge://extensions/`
   - **Chrome:** 地址栏输入 `chrome://extensions/`
2. 开启右上角的**「开发人员模式」**
3. 点击**「加载解压缩的扩展」**
4. 选择本文件夹（`jwgl-autofill-fixer`）
5. 确认扩展已启用

加载后无需额外配置，打开登录页即可生效。

## 文件说明

```
jwgl-autofill-fixer/
├── manifest.json   # 扩展清单（Manifest V3）
├── content.js      # 核心修复脚本
├── icon.png        # 扩展图标
└── README.md       # 本文件
```

## 注意事项

- 本扩展仅在 `https://jwglxxfwpt.hebeu.edu.cn/xtgl/login_slogin.html` 上生效。
- 如果 Bitwarden 仍未自动弹窗，可尝试在该页面按 `Ctrl+Shift+L` 手动触发填充。
- 修复不涉及网络请求或数据收集，不影响登录安全性。
