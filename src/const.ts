export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = (): string => {
  try {
    const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
    const appId = import.meta.env.VITE_APP_ID;

    // التحقق من وجود المتغيرات المطلوبة
    if (!oauthPortalUrl || !appId) {
      console.error('Missing environment variables:', {
        VITE_OAUTH_PORTAL_URL: oauthPortalUrl,
        VITE_APP_ID: appId
      });
      throw new Error('Missing required environment variables for OAuth');
    }

    // التحقق من صحة oauthPortalUrl
    if (!oauthPortalUrl.startsWith('http')) {
      console.error('Invalid OAuth portal URL:', oauthPortalUrl);
      throw new Error(`Invalid OAuth portal URL: ${oauthPortalUrl}`);
    }

    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    
    // استخدام encodeURIComponent بدلاً من btoa لتجنب مشاكل Unicode
    const state = encodeURIComponent(redirectUri);

    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");

    console.log('Generated login URL:', url.toString()); // للتصحيح
    return url.toString();
    
  } catch (error) {
    console.error('Error generating login URL:', error);
    
    // إرجاع URL افتراضي أو معالجة الخطأ
    if (window.location.origin.includes('localhost')) {
      // في التطوير، استخدم fallback
      return `${window.location.origin}/login-fallback`;
    }
    
    // في الإنتاج، يمكنك إعادة رمي الخطأ أو إرجاع صفحة خطأ
    throw error; // أو return '/error';
  }
};