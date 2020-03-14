# dd105g4

## 安裝方式 

 
1. `npm i ` 
2. `gulp`




## sass 基本設定

1. 主要都用 `main.scss` 這隻在控管
2. 設定檔都在 `base/setting.scss`
    字體設定 / 斷點 / 套件使用 我都放在設定檔裡
3. 顏色變數設定 `base/color.scss`
4. 網站的 css reset ---> `base/reset.scss`
5. 一些常用或是共用的，可以放在 ---> `base/common.scss`


## RWD 開發使用

每個 page 有分 `桌機 _desktop.scss / 平板 _medium.scss / 手機 _small.scss`

每頁的邏輯可以照這個走

### 有新增的頁面要加入 
1. 桌機 `respond/desktop `
2. 平板 `respond/medium`
3. 手機 `respond/small`

## 共用組件的新增

每個常用的組件可以新增在 `modules/...`裡
像我的 btn 範例










