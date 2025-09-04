import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { http } from '@/lib/request';

export default function AuthConfirmPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get('code');
  const state = params.get('state');

  useEffect(() => {
    if (!code || !state) {
      return;
    }
    const currentStep = sessionStorage.getItem('migration_current_step');
    const type = currentStep === 'bind-old' ? 'old' : 'new';

    http
      .get(`/wechat/migration/callback?code=${code}&state=${state}`)
      .then(res => {
        const accountKey = type === 'old' ? 'old_account' : 'new_account';
        sessionStorage.setItem(
          accountKey,
          JSON.stringify({
            unionid: res.unionid,
            nickname: res.nickname,
          })
        );

        toast.success(
          type === 'old'
            ? t('migration.old_account_bound')
            : t('migration.new_account_bound')
        );

        if (type === 'old') {
          sessionStorage.setItem('migration_target_step', 'bind-new');
        } else if (type === 'new') {
          sessionStorage.setItem('migration_target_step', 'bind-new');
        }

        sessionStorage.removeItem('migration_current_step');

        navigate('/migration', { replace: true });
      })
      .catch(error => {
        toast.error(error.message, { position: 'bottom-right' });
        navigate('/migration', { replace: true });
      });
  }, [code, state]);

  return (
    <div className="min-h-svh flex justify-center items-center">
      <div className="w-full max-w-md mx-auto">
        {code && state ? (
          <div className="flex font-bold gap-2 justify-center items-center">
            <LoaderCircle className="transition-transform animate-spin" />
            {t('migration.processing')}
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center">
            {t('migration.invalid_callback')}
          </div>
        )}
      </div>
    </div>
  );
}
