// GLOBAL VARIABLE - mendeklarasikan dan inisialisasi variabel 'layoutSize'
var layoutSize = { 'w': 768, 'h': 1024 };

// GLOBAL VARIABLE - mendeklarasikan variable pembantu
var X_POSITION;
var Y_POSITION;
var snd_touch = null;
var snd_music = null;

class sceneMenu extends Phaser.Scene {
   constructor() {
      super({ key: "sceneMenu" });
   }

   preload() {
      this.load.path = 'assets/';

      this.load.image([
         { key: 'bunny_bg', url: 'bunny_bg.png' },
         { key: 'bunny_platform', url: 'bunny_ground.png' },
         { key: 'bunny_stand', url: 'bunny1_stand.png' },
         { key: 'bunny_jump', url: 'bunny1_jump.png' },
         { key: 'carrot', url: 'carrot.png' },
         { key: 'carrots', url: 'carrots.png' },
         { key: 'button1', url: 'button1.png' },
         { key: 'judulgame', url: 'judulgame.png' },
         { key: 'bunny_gameover', url: 'gameover.png' },
         { key: 'sound_on', url: 'sound_on.png' },
         { key: 'sound_off', url: 'sound_off.png' },
         { key: 'music_on', url: 'music_on.png' },
         { key: 'music_off', url: 'music_off.png' },
         { key: 'left_right', url: 'left_right.png' },
      ]);

      this.load.audio([
         { key: 'jump', url: ['fx_lompat.ogg'] },
         { key: 'musik', url: ['musik_bg.mp3'] },
         { key: 'klik', url: ['fx_klik.ogg'] },
      ]);
   }

   create() {
      X_POSITION = {
         'LEFT': 0,
         'CENTER': game.canvas.width / 2,
         'RIGHT': game.canvas.width
      };

      Y_POSITION = {
         'TOP': 0,
         'CENTER': game.canvas.height / 2,
         'BOTTOM': game.canvas.height
      };

      var activeScene = this;

      // tambahkan background
      this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'bunny_bg');

      var judul = this.add.image(X_POSITION.CENTER, Y_POSITION.TOP - 200, 'judulgame');
      judul.setScale(1.5);
      // menambahkan animasi judul
      this.tweens.add({
         targets: judul,
         ease: 'bounce.out',
         duration: 750,
         delay: 250,
         y: Y_POSITION.CENTER - 200,
      });

      // btnPlay
      var btnPlay = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'button1');
      btnPlay.setScale(1.5);
      btnPlay.setInteractive();
      this.add.text(btnPlay.x - 60, btnPlay.y - 20, 'Mainkan', {
         fontFamily: 'Arial',
         fontSize: '30px',
         fontStyle: 'bold',
         color: '#fff',
      });

      // deteksi event pada buttonPlay
      btnPlay.on('pointerdown', function (pointer) { this.setTint(0x5a5a5a) });
      btnPlay.on('pointerout', function (pointer) { this.clearTint(); });
      btnPlay.on('pointerup', function (pointer) {
         this.clearTint();
         snd_touch.play();
         this.scene.scene.start('scenePlay');
      });

      // cek variabel snd_touch
      if (snd_touch == null) {
         snd_touch = this.sound.add('klik');
      }

      // music
      snd_music = this.sound.add('musik');
      snd_music.loop = true;
      snd_music.setVolume(1);
      snd_music.play();

      // button music
      var btnMusic = this.add.image(X_POSITION.RIGHT - 100, Y_POSITION.TOP + 50, 'music_on');
      btnMusic.setInteractive();

      // deteksi event pada btnMusic
      btnMusic.on('pointerdown', function (pointer) { this.setTint(0x5a5a5a) });
      btnMusic.on('pointerout', function (pointer) { this.clearTint(); });
      btnMusic.on('pointerup', function (pointer) {
         this.clearTint();
         // ambil data dari database
         isMusicActive = localStorage['music_enabled'] || 1;

         if (isMusicActive == 0) {
            this.setTexture('music_on');
            // snd_music.setVolume(1);
            snd_music.play();
            // mengubah data yg tersimpan
            localStorage['music_enabled'] = 1;
         } else {
            this.setTexture('music_off');
            // snd_music.setVolume(0);
            snd_music.stop();
            // mengubah data yg tersimpan
            localStorage['music_enabled'] = 0;
         }

         this.setTint(0xffffff);
         snd_touch.play();
      });

      let isMusicActive = localStorage['music_enabled'] || 1;
      if (isMusicActive == 0) {
         btnMusic.setTexture('music_off');

         snd_music.stop();
      }

      // button Sound
      var btnSound = this.add.image(X_POSITION.RIGHT - 50, Y_POSITION.TOP + 50, 'sound_on');
      btnSound.setInteractive();

      // deteksi event pada btnSound
      btnSound.on('pointerdown', function (pointer) { this.setTint(0x5a5a5a) });
      btnSound.on('pointerout', function (pointer) { this.clearTint(); });
      btnSound.on('pointerup', function (pointer) {
         this.clearTint();
         // ambil data dari database
         isSoundActive = localStorage['sound_enabled'] || 1;

         if (isSoundActive == 0) {
            this.setTexture('sound_on');
            snd_touch.setVolume(1);
            // mengubah data yg tersimpan
            localStorage['sound_enabled'] = 1;
         } else {
            this.setTexture('sound_off');
            snd_touch.setVolume(0);
            // mengubah data yg tersimpan
            localStorage['sound_enabled'] = 0;
         }

         this.setTint(0xffffff);
         snd_touch.play();
      });

      // ambil dari database dg key 'sound_enabled'
      let isSoundActive = localStorage['sound_enabled'] || 1;
      if (isSoundActive == 0) {
         btnSound.setTexture('sound_off');
         snd_touch.setVolume(0);
      }

      // kredit dari aset yang digunakan
      this.add.text(X_POSITION.CENTER, Y_POSITION.BOTTOM - 75, 'Gambar: https://www.kenney.nl/assets/', { fontSize: '20px', color: '#444' }).setOrigin(0.5);
      this.add.text(X_POSITION.CENTER, Y_POSITION.BOTTOM - 50, 'Musik: https://www.chosic.com/free-music/all/', { fontSize: '20px', color: '#444' }).setOrigin(0.5);

      var imgCaraMain = this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER + 200, 'left_right');
      imgCaraMain.setScale(0.5);
      this.add.text(X_POSITION.CENTER, imgCaraMain.y + 50, 'Gunakan tombol panah kanan-kiri untuk mengarahkan kelinci', { fontFamily: 'Arial', fontSize: '20px', color: '#000' }).setOrigin(0.5);

   }

}

class scenePlay extends Phaser.Scene {
   constructor() {
      super({ key: "scenePlay" });
   }

   create() {
      var activeScene = this;

      // tambahkan background
      this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'bunny_bg').setScrollFactor(1, 0);

      // buat platform
      this.platforms = this.physics.add.staticGroup();

      // tambahkan carrot
      this.carrots = this.physics.add.group();
      this.physics.add.collider(this.platforms, this.carrots);

      // tambahkan carrot di atas platform
      this.addCarrotAbove = function (sprite) {
         const y = sprite.y - sprite.displayHeight;
         const carrot = this.carrots.get(sprite.x, y, 'carrot')
            .setScale(0.5);

         carrot.setActive(true);
         carrot.setVisible(true);

         this.add.existing(carrot);
         carrot.body.setSize(carrot.width, carrot.height);

         this.physics.world.enable(carrot);
         return carrot;
      }

      for (let i = 7; i > 0; i--) {
         const x = Phaser.Math.Between(200, 500);
         const y = 160 * i;

         var platform = this.platforms.create(x, y, 'bunny_platform');
         platform.scale = 0.5;

         this.addCarrotAbove(platform);

         var body = platform.body;
         body.updateFromGameObject();
      }

      // tambahkan karakter player
      const platforms = this.platforms.getChildren();
      let btm = platforms[0];
      // console.log(btm.y);
      this.player = this.physics.add.sprite(btm.x, btm.y - 150, 'bunny_stand');
      this.player.setScale(0.5);

      this.physics.add.collider(this.platforms, this.player);

      // collision hanya terjadi saat landing
      this.player.body.checkCollision.up = false;
      this.player.body.checkCollision.left = false;
      this.player.body.checkCollision.right = false;

      // tambahkan kamera untuk mengikuti player
      this.cameras.main.startFollow(this.player);

      // kamera tidak bergerak secara horizontal
      this.cameras.main.setDeadzone(this.scale.width * 1.5);

      // mendeteksi input tombol arah keyboard
      this.cursors = this.input.keyboard.createCursorKeys();

      // batasi player supaya tidak bisa keluar arena
      this.horizontalWrap = function (sprite) {
         const halfWidth = sprite.displayWidth * 0.5;
         const gameWidth = this.scale.width;
         if (sprite.x < -halfWidth) {
            sprite.x = halfWidth;
         } else if (sprite.x > gameWidth + halfWidth) {
            sprite.x = gameWidth - halfWidth;
         }
      }

      // hitung carrot yg dikumpulkan
      this.carrotsCollected = 0;

      // tambahkan tampilan jumlah carrots yang dikumpulkan
      const countCarrots = this.add.image(50, 10, 'carrots');
      countCarrots.setScale(0.5)
         .setScrollFactor(0)
         .setOrigin(0.5, 0);

      this.carrotsCollectedText = this.add.text(85, 5, '0', {
         fontFamily: 'Arial',
         fontSize: '30px',
         fontStyle: 'bold',
         color: '#000',
         stroke: '#ffffff',
         strokeThickness: 5
      });
      this.carrotsCollectedText.setScrollFactor(0);
      this.carrotsCollectedText.setOrigin(0.5, 0);

      // tambahkan obyek partikel carrot
      let partikelCarrot = this.add.particles('carrot');

      // membuat emiter carrot
      this.emiterCarrot = partikelCarrot.createEmitter({
         speed: { min: 150, max: 250 },
         gravity: { x: 0, y: 200 },
         scale: { start: 1, end: 0 },
         lifespan: { min: 200, max: 300 },
         quantity: { min: 5, max: 15 },
      });

      this.emiterCarrot.setPosition(-100, -100);
      this.emiterCarrot.explode();

      this.handleCollectCarrot = function (player, carrot) {
         this.carrots.killAndHide(carrot);
         this.physics.world.disableBody(carrot.body);
         this.carrotsCollected++;

         // aktifkan partikel ketika carrot ditabrak
         activeScene.emiterCarrot.setPosition(carrot.x, carrot.y);
         activeScene.emiterCarrot.explode();

         const value = this.carrotsCollected;
         this.carrotsCollectedText.text = value;
      }

      this.physics.add.overlap(
         this.player,
         this.carrots,
         this.handleCollectCarrot,
         undefined,
         this
      );

      this.findBottomMostPlatform = function () {
         const platforms = this.platforms.getChildren();
         let bottomPlatform = platforms[0];

         for (let i = 1; i < platforms.length; i++) {
            const platform = platforms[i];
            if (platform.y < bottomPlatform.y) { continue; }
         }

         return bottomPlatform;
      }

      // SOUND FX
      this.snd_jump = this.sound.add('jump');

      // ambil dari database dg key 'sound_enabled'
      let isSoundActive = localStorage['sound_enabled'] || 1;
      if (isSoundActive == 0) {
         this.snd_jump.setVolume(0);
      }

      let isMusicActive = localStorage['music_enabled'] || 1;
      if (isMusicActive == 0) {
         snd_music.stop();
      }

      console.log(snd_music);
   }

   update() {
      // membuat platform
      this.platforms.children.iterate(child => {
         const platform = child;
         const scrollY = this.cameras.main.scrollY;
         if (platform.y >= scrollY + 1024) {
            platform.y = scrollY - Phaser.Math.Between(50, 100);
            platform.body.updateFromGameObject();
            this.addCarrotAbove(platform);   // tambahkan carrot
         }
      });

      // cek jika player menyentuh platform
      const touchingDown = this.player.body.touching.down;
      if (touchingDown) {
         this.player.setVelocityY(-300);
         this.player.setTexture('bunny_jump');
         this.snd_jump.play();
      }

      const vy = this.player.body.velocity.y;
      if (vy > 0 && this.player.texture.key !== 'bunny_stand') {
         this.player.setTexture('bunny_stand');
      }

      // logika utk input kanan dan kiri
      if (this.cursors.left.isDown && !touchingDown) {
         this.player.setVelocityX(-200);
      } else if (this.cursors.right.isDown && !touchingDown) {
         this.player.setVelocityX(200);
      } else {
         this.player.setVelocityX(0);
      }

      this.horizontalWrap(this.player);

      const bottomPlatform = this.findBottomMostPlatform();
      if (this.player.y > bottomPlatform.y + 1000) {
         let skorTertinggi = localStorage['SkorTertinggi'] || 0;
         if (this.carrotsCollected > skorTertinggi) { localStorage['SkorTertinggi'] = this.carrotsCollected; }

         this.scene.start('sceneGameOver', { carrots: this.carrotsCollected });
      }
   }
}

class sceneGameOver extends Phaser.Scene {
   constructor() {
      super({ key: "sceneGameOver" });
   }

   create(data) {
      // tambahkan background
      this.add.image(X_POSITION.CENTER, Y_POSITION.CENTER, 'bunny_bg');

      var gameOver = this.add.image(X_POSITION.CENTER, Y_POSITION.TOP + 200, 'bunny_gameover');
      gameOver.setScale(0);

      this.tweens.add({
         targets: gameOver,
         ease: 'bounce.out',
         duration: 1000,
         scaleX: 1,
         scaleY: 1
      });

      this.add.text(X_POSITION.CENTER, Y_POSITION.CENTER + 100, 'Tekan Spasi untuk main lagi', { fontSize: 20, color: '#333' }).setOrigin(0.5);

      this.input.keyboard.once('keydown-SPACE', () => {
         this.scene.start('scenePlay');
      });

      // cek score
      this.carrotsCollected = data.carrots;
      let skorTertinggi = localStorage['SkorTertinggi'] || 0;

      // MEMBUAT TAMPILAN SKOR TERTINGGI
      this.labelHighscore = this.add.text(X_POSITION.CENTER, Y_POSITION.CENTER - 80, 'Skor Tertinggi: ' + skorTertinggi, {
         fontFamily: 'Arial',
         fontSize: '40px',
         fontStyle: 'bold',
         color: '#D1CB0D',
         stroke: '#000000',
         strokeThickness: 10
      });
      this.labelHighscore.setOrigin(0.5);
      this.labelHighscore.setDepth(100);

      // MEMBUAT TAMPILAN SKOR
      this.labelScore = this.add.text(X_POSITION.CENTER, Y_POSITION.CENTER, 'Skor: ' + this.carrotsCollected, {
         fontFamily: 'Arial',
         fontSize: '40px',
         fontStyle: 'bold',
         color: '#D1CB0D',
         stroke: '#000000',
         strokeThickness: 10
      });
      this.labelScore.setOrigin(0.5);
      this.labelScore.setDepth(100);
   }

}

// konfigurasi phaser
const config = {
   type: Phaser.AUTO,
   scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: layoutSize.w,
      height: layoutSize.h
   },
   scene: [sceneMenu, scenePlay, sceneGameOver],
   physics: {
      default: 'arcade',
      arcade: {
         gravity: { y: 200 },
         debug: false
      }
   }
};

const game = new Phaser.Game(config);
