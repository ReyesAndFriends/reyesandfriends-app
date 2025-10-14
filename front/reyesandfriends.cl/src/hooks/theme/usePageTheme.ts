import { useEffect, useState } from 'react';

const STORAGE_KEY = 'page_theme';
const DEFAULT_THEME = 'reyes';
const ALL_THEMES = ['reyes', 'reyes-halloween', 'reyes-christmas'];

// Get appropriate topic based on the current date
const getCurrentSeasonTheme = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() 0-11
  const day = now.getDate();

  // 5 oct to 5 nov: reyes-halloween
  if ((month === 10 && day >= 5) || (month === 11 && day <= 5)) {
    return 'reyes-halloween';
  }
  
  // 5 dev to 5 jan: reyes-christmas
  if ((month === 12 && day >= 5) || (month === 1 && day <= 5)) {
    return 'reyes-christmas';
  }

  return DEFAULT_THEME;
};

// Get valid themes based on the current season
const getValidThemes = (): string[] => {
  const currentSeasonTheme = getCurrentSeasonTheme();
  
  if (currentSeasonTheme === 'reyes-halloween') {
    return ['reyes', 'reyes-halloween'];
  } else if (currentSeasonTheme === 'reyes-christmas') {
    return ['reyes', 'reyes-christmas'];
  }
  
  return ['reyes']; // Only reyes outside special seasons
};

export const usePageTheme = () => {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const validThemes = getValidThemes();
    const currentSeasonTheme = getCurrentSeasonTheme();
    
    if (savedTheme && validThemes.includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // If no saved theme or it's invalid for the current season, use the seasonal theme
      const themeToSet = savedTheme === 'reyes' ? 'reyes' : currentSeasonTheme;
      setTheme(themeToSet);
      localStorage.setItem(STORAGE_KEY, themeToSet);
      
      if (savedTheme && !validThemes.includes(savedTheme)) {
        // Reload if the saved theme was invalid for the current season
        window.location.reload();
        return;
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const updateTheme = (newTheme: string) => {
    const validThemes = getValidThemes();
    
    if (validThemes.includes(newTheme)) {
      setTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    } else {
      // If the theme is invalid for the season, reload and set seasonal theme
      const currentSeasonTheme = getCurrentSeasonTheme();
      localStorage.setItem(STORAGE_KEY, currentSeasonTheme);
      window.location.reload();
    }
  };

  return {
    theme,
    setTheme: updateTheme,
    currentSeasonTheme: getCurrentSeasonTheme(),
    validThemes: getValidThemes(),
  };
};
