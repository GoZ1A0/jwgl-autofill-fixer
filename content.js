/**
 * 教务系统密码自动填充修复
 *
 * 修复 方正教务系统
 * 上因开发者有意禁用 autofill 导致密码管理器无法自动填充的问题。
 *
 * 具体修复：
 *   1. 将密码框 (#mm) 立即从 type="text" 改为 type="password"，
 *      使其能被密码管理器识别。
 *   2. 移除 autocomplete="off"，替换为正确的 autocomplete 值。
 *   3. 移除迷惑性的隐藏重复密码框 (#hidMm)，避免密码管理器混淆。
 *
 * 本扩展不影响登录表单的正常提交逻辑和 RSA 加密流程。
 */

(function () {
  'use strict'

  /** 核心修复逻辑，幂等可重复调用 */
  function fixAutofill () {
    var usernameField = document.getElementById('yhm')
    var passwordField = document.getElementById('mm')
    if (!usernameField || !passwordField) return

    // 1. 用户名框：允许密码管理器识别为用户名
    usernameField.autocomplete = 'username'

    // 2. 密码框：改为 type="password" 并移除 onfocus 处理
    if (passwordField.type !== 'password') {
      passwordField.type = 'password'
    }
    passwordField.autocomplete = 'current-password'
    passwordField.removeAttribute('onfocus')

    // 3. 移除隐藏的重复密码框 (#hidMm)，避免密码管理器检测到
    //    两个 name="mm" 的字段而产生混淆
    var hidMm = document.getElementById('hidMm')
    if (hidMm && hidMm.style.display === 'none') {
      hidMm.remove()
    }

    // 4. 移除表单开头的两个无意义隐藏输入（由开发者注释指明为
    //    "防止浏览器自动填充密码" 的迷惑字段），仅移除无 name/id 的
    var form = document.querySelector('form')
    if (form) {
      var dummies = form.querySelectorAll(
        'input[style*="display: none"]:not([name]):not([id])'
      )
      for (var i = 0; i < dummies.length; i++) {
        dummies[i].remove()
      }
    }
  }

  // 立即执行（document_end 时 DOM 已就绪）
  fixAutofill()

  // 额外延时补偿，应对页面后续 JS 动态重置的情况
  var delays = [300, 800, 2000]
  for (var i = 0; i < delays.length; i++) {
    setTimeout(fixAutofill, delays[i])
  }

  // 持续观察 DOM 变化（如 login.js 动态重建表单元素）
  var observer = new MutationObserver(function () {
    fixAutofill()
  })
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: false
  })
})()
