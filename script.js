// --- Global Variable Declarations (keep these at the top) ---
const yunus = document.querySelector(".yunus");
const chayunus = document.querySelector(".kha");
const chaHasina = document.querySelector(".has");
const fightBox = document.querySelector(".fight-box");
const fight = document.querySelector(".fight-text");
const time = document.querySelector(".time");
const hasina = document.querySelector(".hasina");
const rotate = document.querySelector("#rotate-warning");
const dblTap = document.querySelector(".dbl-tap-img");
const jump = document.querySelector(".up-controler");
const down = document.querySelector(".down-controler");
const change_cha = document.querySelector(".cha-change");
const character = document.querySelector(".character");
// const buttons = document.querySelectorAll(".sub-button"); // Can be removed, 'powers' is used
const player1 = document.querySelector(".woman-one");
const player2 = document.querySelector(".woman-two");
const dog = document.querySelector(".dog");
const powers = document.querySelectorAll(".sub-button"); // Keep this one
const dogBox = document.querySelector(".dogs-box");
const dogBoxEne = document.querySelector(".dogs-box-ene");
const healthOne = document.querySelector(".health-one");
const healthTwo = document.querySelector(".health-two");
const style = window.getComputedStyle(healthTwo);
const style2 = window.getComputedStyle(healthOne);
const shield = document.querySelector(".shield");
const dogAttack = document.querySelector(".dogs-attack");
const dogAttackEne = document.querySelector(".dogs-attack-ene");
const heliAttack = document.querySelector(".heli");
const heliAttackEne = document.querySelector(".heliEne");
const playerIsWhat = document.getElementById("dogAttackPlayer");
const EnemyIsWhat = document.getElementById("dogAttackEnemy");
const images = document.querySelector(".img");
const policeCar = document.querySelector(".police-box");
const policeCarEne = document.querySelector(".police-box-ene");
const bullet = document.querySelector(".bullet");
const bulletEne = document.querySelector(".bullet-ene");
const heliBullet = document.querySelector(".heli-bullet");
const pause = document.querySelector(".pause");
const resumeBox = document.querySelector(".resume-box");
const stop = document.querySelectorAll(".stop");
const boomBox = document.querySelector(".boom-box");
const boomBoxEne = document.querySelector(".boom-box2");
const winBox = document.querySelector(".game-end");
const winLose = document.querySelector("#win");
const winORlosePlayer = document.querySelector("#winner");
const continueGame = document.querySelector(".continue");

// sound effect
let gunSound = new Audio("./audio/gunSound.mp3");
let gunSoundEne = new Audio("./audio/gunSound.mp3");
let bohsda = new Audio("./audio/lemadar.mp3");
let pakar = new Audio("./audio/bosda.mp3");
let heliSound = new Audio("./audio/heliSound.mp3");
let heliFire = new Audio("./audio/heliFire.mp3");
let bohsdaEne = new Audio("./audio/lemadar.mp3");
let pakarEne = new Audio("./audio/bosda.mp3");
let heliSoundEne = new Audio("./audio/heliSound.mp3");
let heliFireEne = new Audio("./audio/heliFire.mp3");
let click = new Audio("./audio/click.mp3");
let jumpAu = new Audio("./audio/jump.mp3");
let shieldSound = new Audio("./audio/shield.mp3");
let police = new Audio("./audio/police.mp3");
let policeEne = new Audio("./audio/police.mp3");
let missile = new Audio("./audio/missile.mp3");
let boomSound = new Audio("./audio/explosion.mp3");
let win = new Audio("./audio/win.mp3");
let lose = new Audio("./audio/lose.mp3");
let laugh = new Audio("./audio/laugh.mp3");
let khelaHobe = new Audio("./audio/khelaHobe.mp3");

gunSound.volume = 0.2;
heliSound.volume = 0.7;
heliFire.volume = 0.1;
jumpAu.volume = 1.0;

// --- Game State Variables ---
let noShildCount = 0;
let start = false;
let cha = false; // character switch detector
let gunSelect = false;
const attacks = ["gun", "heli", "dog", "police"];

// --- Utility Functions for Progress Ring ---
function startProgress(buttonId, duration = 5000) {
  const circle = document.querySelector(`#${buttonId} .progress-ring__circle`);
  if (!circle) {
    console.error(`Circle element not found for button ID: ${buttonId}`);
    return;
  }

  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;

  // Instantly empty the circle
  circle.style.transition = "none";
  circle.style.strokeDashoffset = circumference;

  // Force a browser reflow (necessary for transition to apply after instant change)
  circle.getBoundingClientRect();

  // Start filling over the specified duration
  circle.style.transition = `stroke-dashoffset ${duration}ms linear`;
  circle.style.strokeDashoffset = 0;
}

function disableButtons(clickedButton) {
  // Disable the clicked button for 5 seconds
  clickedButton.disabled = true;
  setTimeout(() => {
    clickedButton.disabled = false;
  }, 5000); // 5 seconds

  // Disable all other sub-buttons for 3 seconds
  powers.forEach((button) => {
    if (button !== clickedButton) {
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
      }, 3000); // 3 seconds
    }
  });
}

// --- Game Logic Functions ---
function enemy() {
  let num = Math.floor(Math.random() * 4);
  let attack = attacks[num];
  let healthInPixStg2 = style2.getPropertyValue("width");
  let healthInPix2 = parseFloat(healthInPixStg2);
  let health2 = (healthInPix2 / window.innerWidth) * 100;
  console.log("player :", parseInt(health2));

  if (attack == "gun") {
    gunSoundEne.play();

    initialTime = 0;
    holdTime = 0;
    if (cha == true) {
      bulletEne.style.display = "flex";
      hasina.innerHTML = `<img alt="hasina" src="./images/hasGun.webp" style="transform: rotateY(180deg);" class="hasina has" />`;
      chaHasina.style.transform = "scaleY(1)";
      hasina.classList.remove("breathing");
      bulletEne.style.top = "53.5%";
      setTimeout(() => {
        hasina.innerHTML = `<img alt="hasina" src="./images/hasina.webp" style="transform: rotateY(180deg);" class="hasina has" />`;
        hasina.classList.add("breathing");
        bulletEne.style.display = "none";
        bulletDamage();
      }, 4000);
    } else {
      bulletEne.style.display = "flex";
      yunus.innerHTML = `<img alt="yunus" src="./images/youGun.webp" style="transform: rotateY(180deg);" class="yunus kha" />`;
      yunus.classList.remove("breathing");
      bulletEne.style.top = "50%";
      setTimeout(() => {
        yunus.innerHTML = `<img alt="yunus" src="./images/yunus.webp" class="yunus kha" />`;
        chayunus.style.transform = "scaleX(1)";
        yunus.classList.add("breathing");
        bulletEne.style.display = "none";
        bulletDamage();
      }, 4000);
    }
  } else if (attack == "heli") {
    let n = 105;
    let i = 1;
    initialTime = 0;
    holdTime = 0;

    heliAttackEne.style.display = "flex";
    heliAttackEne.style.left = `${n}%`;
    heliSoundEne.play();
    heliFireEne.play();

    const interval = setInterval(() => {
      if (i > 25) {
        clearInterval(interval);
        setTimeout(() => {
          heliAttackEne.style.display = "none";
          heliAttackEne.style.left = `105%`; // Reset for next click
          bulletDamage();
          heliSoundEne.pause();
          heliFireEne.pause();
        }, 3000);
        return;
      }

      n -= i;
      heliAttackEne.style.left = `${n}%`; // Triggers CSS transition
      i += 2;
    }, 150); // Controls speed
  } else if (attack == "dog") {
    let n = 105;
    if (cha == true) {
      playerIsWhat.src = "./images/dogAttackYunus.webp";
    } else {
      playerIsWhat.src = "./images/dogAttackHas.webp";
    }
    pakarEne.play();
    setTimeout(() => {
      if (cha == true) {
        yunus.style.display = "none";
      } else {
        hasina.style.display = "none";
      }
    }, 2000);
    dogBoxEne.style.left = `${n}%`;
    dogBoxEne.style.display = "flex";
    for (let i = 1; i <= 18; i += 2) {
      n -= i;
      dogBoxEne.style.left = `${n}%`;
    }
    setTimeout(() => {
      dogBoxEne.style.display = "none";
      dogAttackEne.style.display = "flex";
      bohsdaEne.play();
    }, 2000);
    setTimeout(() => {
      dogBoxEne.style.left = "105%";
      dogBoxEne.style.display = "flex";
      let cut = Math.floor(Math.random() * 4) + 1;
      healthOne.style.width = `${Math.max(health2 - cut, 0)}vw`;
      dogAttackEne.style.display = "none";
      hasina.style.display = "flex";
      yunus.style.display = "flex";
    }, 4000);
  } else {
    // Police attack
    let n = 110;
    let i = 1;
    policeEne.play();

    policeCarEne.style.display = "flex";
    policeCarEne.style.left = `${n}%`; // Start position
    if (cha == true) {
      yunus.style.display = "none";
    } else {
      hasina.style.display = "none";
    }

    const interval = setInterval(() => {
      if (i > 25) {
        clearInterval(interval);
        setTimeout(() => {
          policeCarEne.style.display = "none";
          policeCarEne.style.left = `-65%`; // Reset for next click
        }, 2000);
        setTimeout(() => {
          if (cha == true) {
            yunus.style.display = "flex";
          } else {
            hasina.style.display = "flex";
          }
          let cut = Math.floor(Math.random() * 4) + 1;
          healthOne.style.width = `${Math.max(health2 - cut, 0)}vw`;
        }, 1000);
        return;
      }

      n -= i;
      policeCarEne.style.left = `${n}%`; // Triggers CSS transition
      i += 2;
    }, 150);
  }
}

let enemyIntervalId = null;
let protectIntervalId = null;
let protectAnimationCount = 0;

let currentActiveMode = null; // Can be 'enemy', 'protect', or 'none'

function startEnemyLogic() {
  if (enemyIntervalId === null) {
    enemyIntervalId = setInterval(() => {
      enemy();
    }, 4500);
  }
}

function stopEnemyLogic() {
  if (enemyIntervalId !== null) {
    clearInterval(enemyIntervalId);
    enemyIntervalId = null;
  }
}

function startProtectLogic() {
  if (protectIntervalId === null) {
    // Only start if not already running
    // Set initial shield image
    let protectTimeAttack = ["heli", "pulice", "dog"];
    let num = Math.floor(Math.random() * 4);
    let attackPro = protectTimeAttack[num];
    let healthInPixStg2 = style2.getPropertyValue("width");
    let healthInPix2 = parseFloat(healthInPixStg2);
    let health2 = (healthInPix2 / window.innerWidth) * 100;
    console.log("player :", parseInt(health2));

    if (attackPro == "heli") {
    let n = 105;
    let i = 1;
    initialTime = 0;
    holdTime = 0;

    heliAttackEne.style.display = "flex";
    heliAttackEne.style.left = `${n}%`;
    heliSound.play();
    heliFire.play();

    const interval = setInterval(() => {
      if (i > 25) {
        clearInterval(interval);
        setTimeout(() => {
          heliAttackEne.style.display = "none";
          heliAttackEne.style.left = `105%`; // Reset for next click
          bulletDamage();
          heliSound.pause();
          heliFire.pause();
        }, 3000);
        return;
      }

      n -= i;
      heliAttackEne.style.left = `${n}%`; // Triggers CSS transition
      i += 2;
    }, 150); // Controls speed
  } else if (attackPro == "dog") {
    let n = 105;
    if (cha == true) {
      playerIsWhat.src = "./images/dogAttackYunus.webp";
    } else {
      playerIsWhat.src = "./images/dogAttackHas.webp";
    }
    pakar.play();
    setTimeout(() => {
      if (cha == true) {
        yunus.style.display = "none";
      } else {
        hasina.style.display = "none";
      }
    }, 2000);
    dogBoxEne.style.left = `${n}%`;
    dogBoxEne.style.display = "flex";
    for (let i = 1; i <= 18; i += 2) {
      n -= i;
      dogBoxEne.style.left = `${n}%`;
    }
    setTimeout(() => {
      dogBoxEne.style.display = "none";
      dogAttackEne.style.display = "flex";
      bohsda.play();
    }, 2000);
    setTimeout(() => {
      dogBoxEne.style.left = "105%";
      dogBoxEne.style.display = "flex";
      let cut = Math.floor(Math.random() * 4) + 1;
      healthOne.style.width = `${Math.max(health2 - cut, 0)}vw`;
      dogAttackEne.style.display = "none";
      hasina.style.display = "flex";
      yunus.style.display = "flex";
    }, 4000);
  } else {
    // Police attack
    let n = 110;
    let i = 1;
    police.play();

    policeCarEne.style.display = "flex";
    policeCarEne.style.left = `${n}%`; // Start position
    if (cha == true) {
      yunus.style.display = "none";
    } else {
      hasina.style.display = "none";
    }

    const interval = setInterval(() => {
      if (i > 25) {
        clearInterval(interval);
        setTimeout(() => {
          policeCarEne.style.display = "none";
          policeCarEne.style.left = `-65%`; // Reset for next click
        }, 2000);
        setTimeout(() => {
          if (cha == true) {
            yunus.style.display = "flex";
          } else {
            hasina.style.display = "flex";
          }
          let cut = Math.floor(Math.random() * 4) + 1;
          healthOne.style.width = `${Math.max(health2 - cut, 0)}vw`;
        }, 1000);
        return;
      }

      n -= i;
      policeCarEne.style.left = `${n}%`; // Triggers CSS transition
      i += 2;
    }, 150);
  }

    protectAnimationCount = 0; // Reset counter for the new cycle
    protectIntervalId = setInterval(() => {
      let num = Math.floor(Math.random() * 2);

      if (num === 0) {
        shieldSound.play();
        if (cha === false) {
          yunus.innerHTML = `<img alt="yunus" src="./images/youShd.webp" style="transform: rotateY(180deg)" class="yunus kha"/>`;
          yunus.classList.remove("breathing");
        } else {
          hasina.innerHTML = `<img alt="hasina" src="./images/hasShd.webp" style="transform: rotateY(180deg)" class="hasina has"/>`;
          hasina.classList.remove("breathing");
        }
      } else {
        noShildCount += 1;
        if (cha === false) {
          yunus.innerHTML = `<img alt="yunus" src="./images/yunus.webp" class="yunus kha" />`;
          yunus.classList.add("breathing");
        } else {
          hasina.innerHTML = `<img alt="hasina" src="./images/hasina.webp" style="transform: rotateY(180deg)" class="hasina has"/>`;
          hasina.classList.add("breathing");
        }
      }

      protectAnimationCount += 1000;
      if (protectAnimationCount >= 4000) {
        stopProtectLogic(); // This will clear protectIntervalId
        // Ensure final state is normal image and breathing after 4s
        if (cha === false) {
          yunus.innerHTML = `<img alt="yunus" src="./images/yunus.webp" class="yunus kha" />`;
          yunus.classList.add("breathing");
        } else {
          hasina.innerHTML = `<img alt="hasina" src="./images/hasina.webp" style="transform: rotateY(180deg)" class="hasina has"/>`;
          hasina.classList.add("breathing");
        }
      }
    }, 1000); // This runs every 1 second for 4 seconds
  }
}

function stopProtectLogic() {
  if (protectIntervalId !== null) {
    clearInterval(protectIntervalId);
    protectIntervalId = null;
  }
  // Ensure elements are in their default state if protect is stopped early
  if (cha === false) {
    yunus.innerHTML = `<img alt="yunus" src="./images/yunus.webp" class="yunus kha" />`;
    yunus.classList.add("breathing");
  } else {
    hasina.innerHTML = `<img alt="hasina" src="./images/hasina.webp" style="transform: rotateY(180deg)" class="hasina has"/>`;
    hasina.classList.add("breathing");
  }
}

// --- The Main Game Loop (with state management) ---
setInterval(() => {
  if (start === true) {
    // Determine the desired mode based on gunSelect
    let desiredMode;
    if (gunSelect === false) {
      desiredMode = "enemy";
    } else {
      desiredMode = "protect";
    }

    // Only change active mode if it's different from the current one
    if (desiredMode !== currentActiveMode) {
      // Stop the old mode if it was active
      if (currentActiveMode === "enemy") {
        stopEnemyLogic();
      } else if (currentActiveMode === "protect") {
        stopProtectLogic();
      }

      // Start the new mode
      if (desiredMode === "enemy") {
        startEnemyLogic();
      } else if (desiredMode === "protect") {
        startProtectLogic();
      }

      // Update the current active mode
      currentActiveMode = desiredMode;
    }
    // If desiredMode is the same as currentActiveMode, do nothing in this tick.
    // The respective interval will continue on its own schedule.
  } else {
    // If start === false
    // Stop all game-related intervals
    if (currentActiveMode !== "none") {
      // Only log/stop if something was active
      stopEnemyLogic();
      stopProtectLogic();
      currentActiveMode = "none";
    }
  }
}, 150);

let t = 60;
function timer() {
  if (t == 60) {
    time.innerText = `01:00`;
  }

  if (start === true) {
    timing = setInterval(() => {
      time.style.color = "black";
      t -= 1;
      time.innerText = `00:${t}`;
      // if (t == 55) {
      //   boom();
      // }

      if (t <= 9) {
        time.style.color = "#a20000";
        time.innerText = `00:0${t}`;
      }
      if (t == 0) {
        time.innerText = `00:00`;
        clearInterval(timing); // Stop the timer when it reaches zero
        stopEnemyLogic();
        stopProtectLogic();
        boom();
      }
    }, 1000);
  }
}

function boom() {
  let healthInPixStg2 = style2.getPropertyValue("width");
  let healthInPix2 = parseFloat(healthInPixStg2);
  let player = parseInt((healthInPix2 / window.innerWidth) * 100);

  let healthInPixStg = style.getPropertyValue("width");
  let healthInPix = parseFloat(healthInPixStg);
  let enemy = parseInt((healthInPix / window.innerWidth) * 100);

  let winplayer = null;

  if (player <= 0 && enemy >= 0) {
    boomRight();
    winplayer = "enemy";
  } else if (enemy <= 0 && player >= 0) {
    winplayer = "player";
    if (cha == false) {
      boomRight();
    } else {
      boomLeft();
    }
  } else if (enemy > player || player > enemy) {
    winplayer = "none";
    boomRight();
  }

  setTimeout(() => {
    boomSound.play();
    if (winplayer == "player") {
      if (cha == false) {
        hasina.innerHTML = `<img alt="hasina" src="./images/boom.webp" class="hasina has" />`;
        hasina.classList.add("fade-in");
        hasina.classList.remove("breathing");
        hasina.style.transform = "scale(1.8)";
        hasina.style.top = "30%";
      } else {
        hasina.innerHTML = `<img alt="hasina" src="./images/boom.webp" class="hasina has" />`;
        hasina.classList.add("fade-in");
        hasina.classList.remove("breathing");
        hasina.style.transform = "scale(1.8)";
        hasina.style.top = "30%";
      }
    } else if (winplayer == "enemy" || winplayer == "none") {
      if (cha == false) {
        hasina.innerHTML = `<img alt="hasina" src="./images/boom.webp" class="hasina has" />`;
        hasina.classList.add("fade-in");
        hasina.classList.remove("breathing");
        hasina.style.transform = "scale(1.8)";
        hasina.style.top = "30%";
      } else {
        yunus.innerHTML = `<img alt="yunus" src="./images/boom.webp" class="yunus kha" />`;
        yunus.classList.add("fade-in");
        yunus.classList.remove("breathing");
        yunus.style.transform = "scale(1.8)";
        yunus.style.top = "30%";
      }
    }
    boomBox.style.display = "none";
    boomBoxEne.style.display = "none";
  }, 1500);
  setTimeout(() => {
    winner();
  }, 1900);
}

function boomLeft() {
  for (let i = 1; i <= 70; i += 2) {
    missile.play();
    boomBoxEne.style.top = `${-10 + i + 5}%`;
    boomBoxEne.style.left = `${-15 + i + 15}%`;
  }
}

function boomRight() {
  for (let i = 1; i <= 70; i += 2) {
    missile.play();
    boomBox.style.top = `${-10 + i + 5}%`;
    boomBox.style.right = `${-15 + i + 15}%`;
  }
}

function winner() {
  winBox.style.display = "flex";
  hasina.style.display = "none";
  yunus.style.display = "none";

  let healthInPixStg2 = style2.getPropertyValue("width");
  let healthInPix2 = parseFloat(healthInPixStg2);
  let player = (healthInPix2 / window.innerWidth) * 100;

  let healthInPixStg = style.getPropertyValue("width");
  let healthInPix = parseFloat(healthInPixStg);
  let enemy = (healthInPix / window.innerWidth) * 100;

  if (parseInt(player) <= 0 && parseInt(enemy) >= 0) {
    winLose.src = "./images/lose.webp";
    if (cha == false) {
      winORlosePlayer.src = "./images/hasina2.0.webp";
    } else {
      winORlosePlayer.src = "./images/yunus2.0.webp";
    }

    lose.play();
  } else if (parseInt(enemy) <= 0 && parseInt(player) >= 0) {
    winLose.src = "./images/win.webp";
    if (cha == false) {
      laugh.play();
      winLose.style.display = "none";
      winORlosePlayer.src = "./images/message.webp";
    } else {
      win.play();
      winORlosePlayer.src = "./images/yunus2.0.webp";
    }
  } else if (parseInt(player) > parseInt(enemy)) {
    winLose.src = "./images/lose.webp";
    lose.play();
    if (cha == false) {
      winORlosePlayer.src = "./images/hasina2.0.webp";
    } else {
      winORlosePlayer.src = "./images/yunus2.0.webp";
    }
  } else if (parseInt(player) < parseInt(enemy)) {
    winLose.src = "./images/lose.webp";
    lose.play();
    if (cha == false) {
      winORlosePlayer.src = "./images/hasina2.0.webp";
    } else {
      winORlosePlayer.src = "./images/yunus2.0.webp";
    }
  } else if (player == enemy) {
    winLose.src = "./images/lose.webp";
    lose.play();
    if (cha == false) {
      winORlosePlayer.src = "./images/hasina2.0.webp";
    } else {
      winORlosePlayer.src = "./images/yunus2.0.webp";
    }
  }
}

function stopTimer() {
  clearInterval(timing);
}

let initialTime = 0;
let holdTime = 0;

function bulletDamage() {
  let healthInPixStg2 = style2.getPropertyValue("width");
  let healthInPix2 = parseFloat(healthInPixStg2);
  let health2 = (healthInPix2 / window.innerWidth) * 100;

  if (holdTime == 0) {
    healthOne.style.width = `${Math.max(health2 - initialTime * 0.1, 0)}vw`;
  } else {
    healthOne.style.width = `${Math.max(health2 - (4 - holdTime), 0)}vw`;
  }
}

let jumpAnimation = true;
let downAnimation = true;

function jumping() {
  if (jumpAnimation === true) {
    jumpAu.play();
    if (cha == true) {
      yunus.classList.add("jump");
      yunus.classList.remove("breathing");
      jumpAnimation = setInterval(jumpAgain, 1000);
    } else {
      hasina.classList.add("jump");
      hasina.classList.remove("breathing");
      jumpAnimation = setInterval(jumpAgain, 1000);
    }
  }
}

function jumpAgain() {
  if (cha == true) {
    yunus.classList.remove("jump");
    yunus.classList.add("breathing");
  } else {
    hasina.classList.remove("jump");
    hasina.classList.add("breathing");
  }
  clearInterval(jumpAnimation);
  jumpAnimation = true;
}

function downing() {
  if (downAnimation === true) {
    if (cha == true) {
      yunus.classList.add("duck");
      yunus.classList.remove("breathing");
    } else {
      hasina.classList.add("duck");
      hasina.classList.remove("breathing");
    }

    downAnimation = setInterval(downAgain, 1000);
  }
}

function downAgain() {
  if (cha == true) {
    yunus.classList.remove("duck");
    yunus.classList.add("breathing");
  } else {
    hasina.classList.remove("duck");
    hasina.classList.add("breathing");
  }

  clearInterval(downAnimation);
  downAnimation = true;
}

function isFullscreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

// To check if the screen is currently full:
if (isFullscreen()) {
  dblTap.classList.remove("dbl-tap");
  dblTap.style.display = "none";
} else {
  dblTap.classList.add("dbl-tap");
  dblTap.style.display = "flex";
}

// You can also listen for fullscreen change events:
document.addEventListener("fullscreenchange", function () {
  if (isFullscreen()) {
    dblTap.classList.remove("dbl-tap");
    dblTap.style.display = "none";
  } else {
    dblTap.classList.add("dbl-tap");
    dblTap.style.display = "flex";
  }
});

function requestFullscreen() {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

// Double tap / double click support for fullscreen
let lastTap = 0;
window.addEventListener("touchend", function (e) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;
  if (tapLength < 300 && tapLength > 0) {
    requestFullscreen();
  }
  lastTap = currentTime;
});

window.addEventListener("dblclick", function () {
  requestFullscreen();
});

// --- DOMContentLoaded Listener for Initial Setup and Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  const mainPowerButton = document.getElementById("mainPowerButton");
  const powerButtonContainer = document.querySelector(
    ".power-button-container"
  );

  // Main Power Button Toggle
  if (mainPowerButton) {
    mainPowerButton.addEventListener("click", () => {
      powerButtonContainer.classList.toggle("active");
    });
  } else {
    console.error("Main power button with ID 'mainPowerButton' not found!");
  }

  // Power Sub-buttons setup and click handlers
  powers.forEach(function (btn) {
    // Initialize each button's progress bar to be fully filled on load.
    startProgress(btn.id, 0); // Initial fill on load

    btn.addEventListener("click", (event) => {
      // Prevent the click event from propagating if the button is already disabled
      if (event.currentTarget.disabled) {
        return; // Exit the function if the button is disabled
      }

      // When clicked, restart the progress with a 5-second animation
      startProgress(btn.id, 5000);

      // Call the function to handle disabling other buttons
      disableButtons(btn);

      //-----------------------------------------------power specific logic----------------------------------------------------------
      let id = btn.id;
      let healthInPixStg = style.getPropertyValue("width");
      let healthInPix = parseFloat(healthInPixStg);
      let health = (healthInPix / window.innerWidth) * 100;
      console.log("enemy :", parseInt(health));

      if (id == "gun") {
        gunSelect = true;
        images.src = "./images/gun-attack.webp";
        images.classList.add("fade-in");
        bullet.style.display = "flex";
        gunSound.play();
        if (cha == false) {
          hasina.innerHTML = `<img alt="hasina" src="./images/hasGun.webp" class="hasina has" />`;
          chaHasina.style.transform = "scaleY(0.8)";
          hasina.classList.remove("breathing");
          bullet.style.top = "53.5%";
          setTimeout(() => {
            hasina.innerHTML = `<img alt="hasina" src="./images/hasina.webp" class="hasina has" />`;
            hasina.classList.add("breathing");
            images.src = "./images/nirImg.webp";
            bullet.style.display = "none";
            gunSelect = false;
            healthTwo.style.width = `${Math.max(health - noShildCount, 0)}vw`;
          }, 4000);
        } else {
          yunus.innerHTML = `<img alt="yunus" src="./images/youGun.webp" class="yunus kha" />`;
          yunus.classList.remove("breathing");
          bullet.style.top = "50%";
          setTimeout(() => {
            yunus.innerHTML = `<img alt="yunus" src="./images/yunus.webp" style="transform: rotateY(180deg)" class="yunus kha" />`;
            yunus.classList.add("breathing");
            yunus.style.transform = "scaleY(1)";
            images.src = "./images/nirImg.webp";
            bullet.style.display = "none";
            gunSelect = false;
            healthTwo.style.width = `${health - noShildCount}vw`;
          }, 4000);
        }
      }
      let n = -65;

      if (id == "dog") {
        images.src = "./images/dogs-img.webp";
        images.classList.add("fade-in");
        if (cha == false) {
          EnemyIsWhat.src = "./images/dogAttackYunus.webp";
        } else {
          EnemyIsWhat.src = "./images/dogAttackHas.webp";
        }
        pakar.play();
        setTimeout(() => {
          if (cha == false) {
            yunus.style.display = "none";
          } else {
            hasina.style.display = "none";
          }
        }, 2000);
        dogBox.style.left = `${n}%`;
        dogBox.style.display = "flex";
        for (let i = 1; i <= 18; i += 2) {
          n += i;
          dogBox.style.left = `${n}%`;
        }
        setTimeout(() => {
          dogBox.style.display = "none";
          dogAttack.style.display = "flex";
          bohsda.play();
        }, 2000);
        setTimeout(() => {
          dogBox.style.left = "-65%";
          dogBox.style.display = "flex";
          let cut = Math.floor(Math.random() * 4) + 1;
          healthTwo.style.width = `${Math.max(health - cut, 0)}vw`;
          dogAttack.style.display = "none";
          hasina.style.display = "flex";
          yunus.style.display = "flex";
          images.src = "./images/nirImg.webp";
          images.classList.remove("fade-in");
        }, 4000);
      }
      if (id == "heli") {
        images.src = "./images/heli-attack.webp";
        images.classList.add("fade-in");
        let n = -40;
        let i = 1;
        gunSelect = true;

        heliAttack.style.display = "flex";
        heliAttack.style.left = `${n}%`; // Start position
        heliBullet.style.display = "flex";
        heliSound.play();
        heliFire.play();

        const interval = setInterval(() => {
          if (i > 25) {
            clearInterval(interval);
            setTimeout(() => {
              heliAttack.style.display = "none";
              heliAttack.style.left = `-65%`;
              images.src = "./images/nirImg.webp";
              heliBullet.style.display = "none";
              images.classList.remove("fade-in");
              // let num = Math.floor(Math.random() * 4) + 1;//-------------------------------------------------------------------
              healthTwo.style.width = `${Math.max(health - noShildCount, 0)}vw`;
              gunSelect = false;
            }, 3000);
            return;
          }

          n += i;
          heliAttack.style.left = `${n}%`; // Triggers CSS transition
          i += 2;
        }, 150); // Controls speed
      }

      if (id == "police") {
        images.src = "./images/police-attack.webp";
        images.classList.add("fade-in");
        police.play();

        let n = -45;
        let i = 1;

        policeCar.style.display = "flex";
        policeCar.style.left = `${n}%`; // Start position
        if (cha == false) {
          yunus.style.display = "none";
        } else {
          hasina.style.display = "none";
        }

        const interval = setInterval(() => {
          if (i > 25) {
            clearInterval(interval);
            setTimeout(() => {
              policeCar.style.display = "none";
              policeCar.style.left = `-65%`; // Reset for next click
              images.src = "./images/nirImg.webp";
              images.classList.remove("fade-in");
            }, 2000);
            setTimeout(() => {
              if (cha == false) {
                yunus.style.display = "flex";
              } else {
                hasina.style.display = "flex";
              }
              let cut = Math.floor(Math.random() * 4) + 1;
              healthTwo.style.width = `${Math.max(health - cut, 0)}vw`;
            }, 1000);
            return;
          }

          n += i;
          policeCar.style.left = `${n}%`; // Triggers CSS transition
          i += 2;
        }, 150);
      }
    });
  });
  let bullDam = null;
  // Shield controller event listeners
  shield.addEventListener("mousedown", () => {
    shieldSound.play();
    bullDam = setInterval(() => {
      initialTime += 1;
      if (
        initialTime == 1000 ||
        initialTime == 2000 ||
        initialTime == 3000 ||
        initialTime == 4000
      ) {
        holdTime += 1;
      }
    }, 100);
    if (cha == true) {
      yunus.innerHTML = `<img alt="yunus" src="./images/youShd.webp" class="yunus kha"/>`;
      yunus.classList.remove("breathing");
    } else {
      hasina.innerHTML = `<img alt="hasina" src="./images/hasShd.webp" class="hasina has"/>`;
      hasina.classList.remove("breathing");
    }
  });
  shield.addEventListener("mouseup", () => {
    if (cha == true) {
      yunus.innerHTML = `<img alt="yunus" src="./images/yunusUse.webp" class="yunus kha" />`;
      yunus.classList.add("breathing");
    } else {
      hasina.innerHTML = `<img alt="hasina" src="./images/hasina.webp" class="hasina has"/>`;
      hasina.classList.add("breathing");
    }
    clearInterval(bullDam);
  });
  shield.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent scrolling/zooming
    shieldSound.play();
    bullDam = setInterval(() => {
      initialTime += 1;
      if (
        initialTime == 1000 ||
        initialTime == 2000 ||
        initialTime == 3000 ||
        initialTime == 4000
      ) {
        holdTime += 1;
      }
    }, 100);
    if (cha == true) {
      yunus.innerHTML = `<img alt="yunus" src="./images/youShd.webp" class="yunus kha"/>`;
      yunus.classList.remove("breathing");
      yunus.style.transform = "scaleY(1.1)";
    } else {
      hasina.innerHTML = `<img alt="hasina" src="./images/hasShd.webp" class="hasina has"/>`;
      hasina.classList.remove("breathing");
    }
  });
  shield.addEventListener("touchend", () => {
    if (cha == true) {
      yunus.innerHTML = `<img alt="yunus" src="./images/yunusUse.webp" class="yunus kha"/>`;
      yunus.classList.add("breathing");
      yunus.style.transform = "scaleY(1)";
    } else {
      hasina.innerHTML = `<img alt="hasina" src="./images/hasina.webp" class="hasina has"/>`;
      hasina.classList.add("breathing");
    }
    clearInterval(bullDam);
  });

  // Character change button
  change_cha.addEventListener("click", () => {
    click.play();
    click.currentTime = 0;
    if (cha == false) {
      character.innerHTML = `<img alt="Fight" src="./images/yunus2.0.webp"  class="character-img">`;
      // chayunus.style.transform = "rotateY(180deg)";
      yunus.innerHTML = `<img alt="yunus" src="./images/yunusUse.webp" class="yunus kha" />`;
      chaHasina.style.transform = "rotateY(180deg)";
      yunus.style.left = "-12%";
      yunus.style.right = "60%";
      hasina.style.left = "60%";
      player1.style.backgroundImage = "url(./images/yunus2.0.webp)";
      player2.style.backgroundImage = "url(./images/hasina2.0.webp)";
      cha = true;
    } else {
      character.innerHTML = `<img alt="Fight" src="./images/hasina2.0.webp" class="character-img">`;
      // chayunus.style.transform = "rotateY(0deg)";
      yunus.innerHTML = `<img alt="yunus" src="./images/yunus.webp" class="yunus kha" />`;
      chaHasina.style.transform = "rotateY(0deg)";
      yunus.style.right = "-5%";
      yunus.style.left = "55%";
      hasina.style.left = "-6%";
      hasina.style.right = "-5%";
      player1.style.backgroundImage = "url(./images/hasina2.0.webp)";
      player2.style.backgroundImage = "url(./images/yunus2.0.webp)";
      cha = false;
    }
  });

  // Fight button listener
  fight.addEventListener("click", () => {
    click.play();
    click.currentTime = 0;
    fightBox.classList.add("fight");
    khelaHobe.play();
    setTimeout(() => {
      fightBox.style.display = "none";
      start = true;
      timer();
    }, 100);
  });

  //continue
  continueGame.addEventListener("click", () => {
    location.reload();
    // winBox.style.display = "none";
    // fightBox.style.display = "flex";
    // start = false;
    // t = 60;
    // timer();
    // yunus.innerHTML = `<img alt="yunus" src="./images/yunus.webp" class="yunus kha" />`;
    // hasina.innerHTML = `<img alt="hasina" src="./images/hasina.webp" class="hasina has" />`;
    // hasina.style.display = "flex";
    // yunus.style.display = "flex";
    // hasina.classList.add("breathing");
    // yunus.classList.add("breathing");
    // healthOne.style.width = "25vw";
    // healthTwo.style.width = "25vw";
    // hasina.style.top = "0"
    // hasina.style.bottom = "7%";
    // hasina.style.transform = "scale(1)";
    // hasina.classList.remove("fade-in");
    // yunus.style.bottom = "7%";
    // yunus.style.transform = "scale(1)";
    // yunus.classList.remove("fade-in");
  });

  // pause
  pause.addEventListener("click", () => {
    click.play();
    click.currentTime = 0;
    stopEnemyLogic();
    stopTimer();
    hasina.classList.remove("breathing");
    yunus.classList.remove("breathing");
    resumeBox.style.display = "flex";
    resumeBox.classList.remove("fight");
  });

  stop.forEach((button) => {
    button.addEventListener("click", () => {
      click.play();
      click.currentTime = 0;
      let id = button.id;
      if (id == "resume") {
        resumeBox.style.display = "none";
        resumeBox.classList.add("fight");
        hasina.classList.add("breathing");
        yunus.classList.add("breathing");
        timer();
      } else {
        resumeBox.style.display = "none";
        fightBox.style.display = "flex";
        start = false;
        t = 60;
        timer();
        hasina.classList.add("breathing");
        healthOne.style.width = "25vw";
        healthTwo.style.width = "25vw";
      }
    });
  }); // -----------------------------------------------------------------------------

  // Keyboard control for jump/down
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      jumping();
    } else if (event.key === "ArrowDown") {
      downing();
    }
  });

  // Touch/mouse for jump/down buttons
  jump.addEventListener("mousedown", jumping);
  down.addEventListener("mousedown", downing);
  jump.addEventListener("touchstart", (e) => {
    e.preventDefault();
    jumping();
  });
  down.addEventListener("touchstart", (e) => {
    e.preventDefault();
    downing();
  });
});
