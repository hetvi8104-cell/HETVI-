const STORAGE_KEY = 'hetvi_portfolio_custom_images';

export function getCustomImages(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
}

export function getEffectiveImageUrl(slotId: string, defaultUrl: string): string {
  const images = getCustomImages();
  return images[slotId] || defaultUrl;
}

export function saveCustomImage(slotId: string, imageUrl: string) {
  try {
    const images = getCustomImages();
    images[slotId] = imageUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    window.dispatchEvent(new CustomEvent('portfolio_images_updated', { detail: { slotId, imageUrl } }));
  } catch (e) {
    console.error('Failed to save image in storage', e);
  }
}

export function resetCustomImage(slotId: string) {
  try {
    const images = getCustomImages();
    delete images[slotId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    window.dispatchEvent(new CustomEvent('portfolio_images_updated', { detail: { slotId } }));
  } catch (e) {
    console.error('Failed to reset image', e);
  }
}

export function resetAllCustomImages() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('portfolio_images_updated', { detail: { all: true } }));
  } catch (e) {
    console.error('Failed to reset all images', e);
  }
}
