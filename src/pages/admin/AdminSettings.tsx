import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getSettings, saveSettings } from '../../lib/settings';

export default function AdminSettings() {
  const [password, setPassword] = useState('');
  const [siteName, setSiteName] = useState('EXPLORE MENU');
  const [logoUrl, setLogoUrl] = useState('');
  const [storyContent, setStoryContent] = useState('');

  useEffect(() => {
    // Load existing settings from Supabase
    getSettings()
      .then(data => {
        if (data.adminPassword) setPassword(data.adminPassword);
        if (data.siteName) setSiteName(data.siteName);
        if (data.siteLogo) setLogoUrl(data.siteLogo);
        if (data.siteStory) setStoryContent(data.siteStory);
      })
      .catch(err => console.error('Failed to load settings', err));
  }, []);

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentSettings = await getSettings();
      const success = await saveSettings({
        ...currentSettings,
        adminPassword: password,
      });
      if (success) {
        toast.success('Admin password updated successfully.');
      } else {
        toast.error('Failed to update password');
      }
    } catch (e) {
      toast.error('Failed to update password');
    }
  };

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const currentSettings = await getSettings();
      const success = await saveSettings({
        ...currentSettings,
        siteName,
        siteLogo: logoUrl,
        siteStory: storyContent
      });
      
      if (success) {
        localStorage.setItem('siteName', siteName);
        localStorage.setItem('siteLogo', logoUrl);
        localStorage.setItem('siteStory', storyContent);
        toast.success('General settings saved! They will reflect on the live site immediately.');
        window.dispatchEvent(new Event('settingsUpdated'));
      } else {
         toast.error('Failed to save settings');
      }
    } catch (e) {
      toast.error('Failed to save settings');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight">Settings</h1>
      
      {/* General Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-gray-900">General Settings</h2>
        </div>
        <form onSubmit={handleSaveGeneral} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Website Name</label>
              <input 
                type="text" 
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Upload Logo</label>
              <div className="flex items-center gap-4">
                 {logoUrl && <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain border border-gray-200 rounded p-1"/>}
                 <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-gray-700 mb-1">"Our Story" Content (About Page)</label>
             <textarea 
               rows={6}
               value={storyContent}
               onChange={e => setStoryContent(e.target.value)}
               className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
             />
          </div>

          <div className="flex justify-end">
             <button type="submit" className="px-6 py-2 bg-blue-700 text-white text-sm font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-sm">
               Save Changes
             </button>
          </div>
        </form>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-gray-900">Security</h2>
        </div>
        <form onSubmit={handleSavePassword} className="p-6 space-y-4 max-w-sm">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Admin Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-[10px] text-gray-500 mt-1">Leave empty to keep current password. Default is "Abu Nasir".</p>
          </div>
          <button type="submit" className="px-6 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-sm w-full">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
