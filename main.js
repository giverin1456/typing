
let untyped = '';
// 変数の初期化、画面に表示する文字列を入れる変数
let typed = '';
//入力済み文字列を入れる変数
let score = 0;
//文字の正解数を計算するため
 
// 必要なHTML要素の取得→id
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');


const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];


// ランダムなテキストを表示
const createText = () => {
  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;
  let random = Math.floor(Math.random() * textLists.length);
  //floorで整数に、0から2までのうちでランダムに整数を取得(0.00001*length(0〜2))
  untyped = textLists[random];
  //配列[let random]を取得
  untypedfield.textContent = untyped;
  // untypedfield(取得したid)の部分にuntyped(配列[0])を表示させる

};
//アウトプット
 
// キー入力の判定
const keyPress = e => {
  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    //e.key(押したキーボード)とuntypedの最初の文字が違うならreturnする
    wrap.classList.add('mistyped');
    //classを追加する
     // 100ms後に背景色を元に戻す
     setTimeout(() => {
    wrap.classList.remove('mistyped');
    // 100ミリ秒で自動で背景を戻す
    }, 100);
    return;
  }
  // 正タイプの場合
  // 正タイプの場合はscore=0;に数を追加
  score++;
  typed += untyped.substring(0, 1);
  //変数untypedの先頭文字を取得し、変数typedの末尾に追加する
  untyped = untyped.substring(1);
  //変数untypedに2文字目以降の文字列を再代入する（変数untypedの先頭文字を削除する）
  typedfield.textContent = typed;
  //入力が完了した文字(色が変わる)にtypedを表示
  untypedfield.textContent = untyped;
  //入力待ちの文字にuntypedを表示

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }

};

// タイピングスキルのランクを判定
const rankCheck = score => {
 
  // スコアの値を返す
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
   } else if(score < 200) {
     text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
   } else if(score < 300) {
     text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
   } else if(score >= 300) {
     text = `あなたのランクはSです。\nおめでとうございます!`;    
   }
  
   // 生成したメッセージと一緒に文字列を返す
   return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  //引数id（setInterval()メソッドの戻り値）を受け取る
  clearInterval(id);
  const result = confirm(rankCheck(score));
  //confirm()メソッドでダイアログを表示
  // OKボタンをクリックされたらリロードする
  if(result == true) {window.location.reload()};
};


// カウントダウンタイマー
const timer = () => {
  let time = 60;
  //60秒
  const id = setInterval(() => {
    // setInterval()メソッドの戻り値には、「私はタイマーです！」と判別できるように名前のようなものが入っている
    // setInterval()メソッドの戻り値をidという変数に格納
    if(time <= 0) {
      // カウントが0になったらタイマーを停止する
      clearInterval(id);
      // clearInterval()メソッドの引数にその名前を渡すことで、「このタイマーを止めたいです」と命令
      gameOver(id);
      //引数id（setInterval()メソッドの戻り値）を受け取って、カウントダウンを停止してコンソールログにメッセージを表示する
    }

    // カウントダウンする
    count.textContent = time--;
  }, 1000);
  //setInterval()メソッドの第2引数には「ミリ秒」を指定するルール

};


// ゲームスタート時の処理
start.addEventListener('click', () => {
  // カウントダウンタイマーを開始する
  timer();
  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする  //?書き方がわからない
  start.style.display = 'none';

// キーボードのイベント処理
document.addEventListener('keypress', keyPress);
//キーボードのキーを押したとき関数keyPressの処理を行う
});
 
untypedfield.textContent = 'スタートボタンで開始';
//untypedfieldにtext追加
