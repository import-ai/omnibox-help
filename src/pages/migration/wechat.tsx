import isMobile from 'ismobilejs';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import { http } from '@/lib/request';

import { WeChatIcon } from './icon';
import { Scan } from './scan';

interface IProps {
  type: 'old' | 'new';
  onSuccess?: () => void;
}

export default function WeChatMigration(props: IProps) {
  const { type, onSuccess } = props;
  const { t } = useTranslation();
  const userAgent = navigator.userAgent.toLowerCase();
  const isPhone = isMobile(userAgent).phone;
  const isWeChat = userAgent.includes('micromessenger');

  const alertDisableWeChatLogin = () => {
    toast(t('login.wechat_disabled'), { position: 'bottom-right' });
  };

  const loginWithWeChat = () => {
    sessionStorage.setItem(
      'migration_current_step',
      type === 'old' ? 'bind-old' : 'bind-new'
    );

    http
      .get(`/wechat/auth-url?type=${type}`)
      .then(authUrl => {
        location.href = authUrl;
      })
      .catch(error => {
        toast.error(error.message, { position: 'bottom-right' });
      });
  };

  const handleScanSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  if (isPhone && !isWeChat) {
    return (
      <Button
        variant="default"
        onClick={alertDisableWeChatLogin}
        className="w-full [&_svg]:size-5 dark:[&_svg]:fill-white opacity-50"
      >
        <WeChatIcon />
        {t('migration.bind_account')}
      </Button>
    );
  }

  if (isPhone && isWeChat) {
    return (
      <Button
        variant="default"
        onClick={loginWithWeChat}
        className="w-full [&_svg]:size-5 dark:[&_svg]:fill-white"
      >
        <WeChatIcon />
        {t('migration.bind_account')}
      </Button>
    );
  }

  return <Scan type={type} onSuccess={handleScanSuccess} />;
}
