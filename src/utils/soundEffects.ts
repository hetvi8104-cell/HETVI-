class SoundEngine {
  private isMuted: boolean = true;

  public setMuted(_muted: boolean) {
    this.isMuted = true;
  }

  public getMuted() {
    return true;
  }

  public playSlideTransition() {
    // Disabled - silent operation
  }

  public playClick() {
    // Disabled - completely removed mouse-click sound
  }

  public play3DInteract() {
    // Disabled - silent operation
  }

  public toggleAmbient() {
    return false;
  }

  public isAmbientActive() {
    return false;
  }
}

export const sounds = new SoundEngine();

