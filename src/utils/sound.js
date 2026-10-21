/**
 * WEDDING BACKGROUND MUSIC ENGINE
 * Plays the romantic wedding theme "Sab Tera" at a mild, comfortable volume.
 * 
 * - Ground-truth sync with HTMLAudioElement (play / pause events).
 * - Instant toggle with zero latency so the UI icon immediately reflects the state.
 * - Mild volume level (0.35) designed for comfortable reading and celebration.
 * - Mobile-first touch-gesture compatibility.
 */

class WeddingMusicEngine {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.targetVolume = 0.35; // Mild, comfortable volume
    this.listeners = new Set();
    this.trackInfo = {
      title: 'Sab Tera',
      subtitle: 'Baaghi • Romantic Wedding Song',
    };

    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  notify(forceState) {
    const state = typeof forceState === 'boolean'
      ? forceState
      : (this.audio ? !this.audio.paused : this.isPlaying);

    this.isPlaying = state;
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch (err) {
        console.warn('Audio listener error:', err);
      }
    });
  }

  subscribe(fn) {
    this.listeners.add(fn);
    const currentState = this.audio ? !this.audio.paused : this.isPlaying;
    fn(currentState);
    return () => this.listeners.delete(fn);
  }

  getIsPlaying() {
    if (this.audio) {
      return !this.audio.paused;
    }
    return this.isPlaying;
  }

  initAudio() {
    if (this.audio) return;
    try {
      this.audio = new Audio('/wedding-music.mp3');
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = this.targetVolume;

      // Ground truth event listeners: guarantees state is always accurate
      this.audio.addEventListener('play', () => {
        this.notify(true);
      });

      this.audio.addEventListener('playing', () => {
        this.notify(true);
      });

      this.audio.addEventListener('pause', () => {
        this.notify(false);
      });

      this.audio.addEventListener('ended', () => {
        this.notify(false);
      });

      this.audio.addEventListener('error', (err) => {
        console.warn('Background audio error:', err);
        this.notify(false);
      });
    } catch (e) {
      console.warn('Audio initialization error:', e);
    }
  }

  start() {
    this.initAudio();
    if (!this.audio) return false;

    this.audio.volume = this.targetVolume;
    this.isPlaying = true;
    this.notify(true);

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.notify(true);
        })
        .catch((err) => {
          console.warn('Playback prevented by browser autoplay policy:', err);
          this.isPlaying = false;
          this.notify(false);
        });
    }
    return true;
  }

  stop() {
    if (!this.audio) {
      this.isPlaying = false;
      this.notify(false);
      return false;
    }

    try {
      this.audio.pause();
    } catch (err) {
      console.warn('Pause error:', err);
    }

    this.isPlaying = false;
    this.notify(false);
    return false;
  }

  pause() {
    return this.stop();
  }

  toggle() {
    this.initAudio();
    if (!this.audio) return false;

    if (this.audio.paused) {
      return this.start();
    } else {
      return this.stop();
    }
  }

  setVolume(vol) {
    this.targetVolume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.targetVolume;
    }
  }
}

export const weddingMusic = new WeddingMusicEngine();
export const ambientSound = weddingMusic;
