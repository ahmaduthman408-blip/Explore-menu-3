import { supabase } from './supabase';

export interface SiteSettings {
  siteName: string;
  siteLogo: string;
  siteStory: string;
  adminPassword?: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'EXPLORE MENU',
  siteLogo: '',
  siteStory: `EXPLORE MENU delivers premium, affordable fragrances tailored to your personality and lifestyle. We believe that luxury shouldn't be a privilege, but an accessible expression of who you are.\n\nFounded on the principles of authenticity and elegance, every bottle represents a journey. Whether you're heading to a boardroom meeting or a casual evening out, we have the perfect scent to boost your confidence and leave a lasting impression.\n\nAs we continue to grow, our mission remains the same: To democratize luxury, offering you an exquisite array of scents that empower you to author your own story, one spray at a time.`,
  adminPassword: ''
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('description')
      .eq('name', '__SITE_SETTINGS__')
      .limit(1);

    if (error || !data || data.length === 0) {
      return DEFAULT_SETTINGS;
    }

    const settingsObj = JSON.parse(data[0].description);
    return { ...DEFAULT_SETTINGS, ...settingsObj };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: SiteSettings): Promise<boolean> {
  try {
    const settingsStr = JSON.stringify(settings);
    
    // Check if it exists
    const { data } = await supabase
      .from('products')
      .select('id')
      .eq('name', '__SITE_SETTINGS__')
      .limit(1);
      
    if (data && data.length > 0) {
      // Update
      const { error } = await supabase
        .from('products')
        .update({ description: settingsStr })
        .eq('id', data[0].id);
      return !error;
    } else {
      // Insert
      const { error } = await supabase
        .from('products')
        .insert([{ 
          name: '__SITE_SETTINGS__', 
          description: settingsStr, 
          price: 0, 
          image: '' 
        }]);
      return !error;
    }
  } catch (e) {
    return false;
  }
}
