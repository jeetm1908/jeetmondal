<!DOCTYPE html>
<html lang="ka">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ვალენტინობის ანიმაცია</title>
<style>
  body { text-align: center; font-family: sans-serif; background: #ffe6e6; }
  #cat-gif { width: 300px; transition: opacity 0.2s; }
  button { font-size: 18px; padding: 15px 30px; margin: 10px; cursor: pointer; }
  #tease-toast {
    position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%);
    background: #fff; padding: 10px 20px; border-radius: 12px; opacity: 0;
    transition: opacity 0.3s;
  }
  #tease-toast.show { opacity: 1; }
</style>
</head>
<body>

<img id="cat-gif" src="https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif" alt="cat">
<br>
<button id="yes-btn">დიახ</button>
<button id="no-btn">არა</button>
<button id="music-toggle" onclick="toggleMusic()">🔊</button>

<div id="tease-toast"></div>

<audio id="bg-music" src="your-music.mp3" loop></audio>

<script>
const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
];

const noMessages = [
    "ცოტათი",
    "დარწმუნებული ხარ? 🤔",
    "ოო ანიიიიი 🥺",
    "ოო მეწყინებაა ანიი",
    "ნუ მაჭყვიტინეებბბბ სპლიყვი ხომარვაარ 😢",
    "უუუფფ გეგონოოს 💔",
    "გამორიცხულია",
    "რეზის გარეშე აღარიქნება",
    "ვსოო რეზიი ყოველთვის იქნება აწიი 😜"
];

const yesTeasePokes = [
    "არგაინტერესებს მეორე შემთხვევაში რამოხდებოდა? 😏",
    "განაგრძე, დააჭირე არას... მხოლოდ ერთხელ 👀",
    "ასე ძალიან გიყვარვარ?😈",
    "რასაყვარელია ჩემი ლამაზთვალება 😏"
];

let yesTeasedCount = 0;
let noClickCount = 0;
let runawayEnabled = false;
let musicPlaying = true;

const catGif = document.getElementById('cat-gif');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const music = document.getElementById('bg-music');

music.muted = true;
music.volume = 0.3;
music.play().then(() => { music.muted = false }).catch(() => {
    document.addEventListener('click', () => { music.muted = false; music.play().catch(()=>{}) }, { once: true })
});

function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        document.getElementById('music-toggle').textContent = '🔇';
    } else {
        music.muted = false;
        music.play();
        musicPlaying = true;
        document.getElementById('music-toggle').textContent = '🔊';
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)];
        yesTeasedCount++;
        showTeaseMessage(msg);
        return;
    }
    window.location.href = 'yes.html';
}

function handleNoClick() {
    noClickCount++;
    const msgIndex = Math.min(noClickCount, noMessages.length - 1);
    noBtn.textContent = noMessages[msgIndex];

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.35}px`;
    const padY = Math.min(18 + noClickCount * 5, 60);
    const padX = Math.min(45 + noClickCount * 10, 120);
    yesBtn.style.padding = `${padY}px ${padX}px`;

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`;
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1);
    swapGif(gifStages[gifIndex]);

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway();
        runawayEnabled = true;
    }
}

function swapGif(src) {
    catGif.style.opacity = '0';
    setTimeout(() => {
        catGif.src = src;
        catGif.style.opacity = '1';
    }, 200);
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway);
    noBtn.addEventListener('touchstart', runAway, { passive: true });
}

function runAway() {
    const margin = 20;
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    const maxX = window.innerWidth - btnW - margin;
    const maxY = window.innerHeight - btnH - margin;

    const randomX = Math.random() * maxX + margin / 2;
    const randomY = Math.random() * maxY + margin / 2;

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '50';
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

yesBtn.addEventListener('click', handleYesClick);
noBtn.addEventListener('click', handleNoClick);
</script>

</body>
</html>
