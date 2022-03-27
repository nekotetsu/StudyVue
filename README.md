# このリポジトリについて
このリポジトリは私個人のVue.jsの勉強用のリポジトリです。
SPA等を作成することを目的にVue3を勉強していきます。

# Vue.jsの学習の進め方
基本的に下記のVueの公式HPのガイドを見ながらVueを触っていきます。
https://v3.ja.vuejs.org/guide/introduction.html

# 学習メモ
## カウントアップを表示
Vueを使用するにはVue.jsを取り込む必要がありますが、今回は勉強用ということなのでバージョン等指定せず、最新版をCDNで取り込んでいます。
最新版は下記。
https://unpkg.com/vue@next

Vueの挙動を知るための最初のサンプルとしてやってみたのが下記のカウントアップ。詳細はこれから勉強。

~~~html:index.html
<!DOCTYPE html>
<html>

<head>
  <title>StudyVue</title>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/vue@next"></script>
</head>

<body>
  <div id="counter">
    Counter: {{ counter }}
  </div>

  <script>
    const Counter = {
      data() {
        return {
          counter: 0
        }
      },
      mounted() {
        setInterval(() => {
          this.counter++
        }, 1000)
      }
    }

    Vue.createApp(Counter).mount('#counter')
  </script>
</body>

</html>
~~~