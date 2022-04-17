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
`Counter`をインスタンス化してDOM要素である`#counter`にマウント、`#counter`内の`Counter: {{ counter }}`とJS内でカウントアップしている変数`counter`とを関連付けている様子。

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

## 要素の属性のバインド
下記のように`v-bind`を使用することで、要素の属性をリアクティブに変更することが可能。この例では`span`で囲われた要素のtitleの中身を`message`でバインドしている。
~~~html:index.html
<div id="bind-attribute">
  <span v-bind:title="message">
    Hover your mouse over me for a few seconds to see my dynamically bound
    title!
  </span>
</div>
<script>
  const AttributeBinding = {
    data() {
      return {
        message: "You loaded this page on " + new Date().toLocaleDateString()
      }
    }
  }
  Vue.createApp(AttributeBinding).mount("#bind-attribute")
</script>
~~~

## SFCをCDNで試す
Vueと言えばコンポーネント化。Vueのコンポーネントと言えばSFC(Single File Components)。
ということで下記記事を参考に、SFCをCDNで試してみます。
https://basukin.blog/2021/08/23/vue3-cdn%E3%81%A7%E3%82%82sfc%E3%82%92%E4%BD%BF%E3%81%84%E3%81%9F%E3%81%84/

基本的なことは上記記事に記載があるので、私が詰まった部分を中心にメモを残します。

### HTML部分
~~~html:SFCtest.html
<!DOCTYPE html>
<html>

<body>
  <div id="app">
    <my-component></my-component>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader"></script>
  <script src="https://cdn.jsdelivr.net/npm/less"></script>
  <script src="./index.js"></script>
  <script>
    (async () => {
      const MyComponent = await loadVue('./components/myComponent.vue');
      const app = Vue.createApp({
        components: {
          MyComponent
        }
      });
      app.mount('#app');
    })();
  </script>
</body>

</html>
~~~

上記がメインのHTML。
おおまかにやっていることは下記4点＋3点の計7点。

**Vueアプリケーションを使う**
- `<div id="app"></div>`でID設定
- `<my-component></my-component>`でコンポーネントを配置
- VueそのもののJavaScriptライブラリ読み込み
- `app.mount('#app')`で`id="app"`にVueアプリケーションをマウント

**Vueアプリケーションを作る**
- SFCのローダー等のJavaScriptライブラリ等の読み込み
- `loadVue('./components/myComponent.vue')`でコンポーネントの読み込み
- `Vue.createApp`でVueアプリケーションのインスタンス化


ここで使用しているコンポーネント配置のタグ名は、`Vue.createApp`内で読み込んでいるコンポーネント名`MyComponent`と一致している必要がある。
ただし、HTMLのタグ名や属性名は大文字、小文字を区別しないため、JavaScript内でキャメルケースでつけた`MyComponent`等の名前は、HTML内ではそれと同等のケバブケース（ハイフンで区切られた記法）で`my-component`のように記載しなければいけない。

### SFC部分
今回は`myComponent.vue`というファイル名でSFCを作成。HTMLとJavaScript、CSSを1つのファイルで管理できるのでかなり便利な印象。
~~~vue:MyComponent.vue
<template>
  <span class="example">{{ msg }}</span>
</template>
<script>
export default {
  data() {
    return {
      msg: "world!",
      color: "blue",
    };
  },
};
</script>
<style lang="less">
body {
  color: red;
}
.example {
  color: v-bind("color");
}
</style>
~~~

`<template></template>`：HTML内で使用したタグがこのtemplateタグ内の内容に置き換わります。
`<script></script>`：今回は変数として`data()`だけの定義。メソッドや算出プロパティ等もここに記載。
`<style></style>`：CSSの内容を記載。今回は`color: v-bind("color");`のようにcolorを変数で指定しているが、通常のCSSのように`color: red;`のように直接指定しても問題ない。
