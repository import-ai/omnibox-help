import { AlertCircle, CheckCircle2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { http } from '@/lib/request';

import WeChatMigration from './wechat';

type MigrationStep = 'intro' | 'bind-old' | 'bind-new';

interface WechatAccount {
  unionid: string;
  nickname: string;
}

export default function WechatMigrationPage() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<MigrationStep>('intro');
  const [isLoading, setIsLoading] = useState(false);
  const [oldAccount, setOldAccount] = useState<WechatAccount | null>(null);
  const [newAccount, setNewAccount] = useState<WechatAccount | null>(null);
  const refetch = () => {
    const oldAccountData = sessionStorage.getItem('old_account');
    const newAccountData = sessionStorage.getItem('new_account');

    if (oldAccountData) {
      setOldAccount(JSON.parse(oldAccountData));
    }

    if (newAccountData) {
      setNewAccount(JSON.parse(newAccountData));
    }
  };

  useEffect(() => {
    refetch();
    const targetStep = sessionStorage.getItem('migration_target_step');
    if (targetStep) {
      setCurrentStep(targetStep as MigrationStep);
      sessionStorage.removeItem('migration_target_step');
    }
  }, []);

  const handleMigration = async () => {
    if (!oldAccount || !newAccount) {
      toast.error(t('migration.accounts_required'));
      return;
    }

    setIsLoading(true);
    try {
      await http.post('/wechat/migration', {
        oldUnionid: oldAccount.unionid,
        newUnionid: newAccount.unionid,
      });

      toast.success(t('migration.success'));
      sessionStorage.removeItem('old_account');
      sessionStorage.removeItem('new_account');

      location.href = 'https://www.omnibox.pro';
    } catch {
      toast.error(t('migration.failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const renderIntroStep = () => (
    <Card className="dark:border-[#303030] dark:bg-[#171717]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>{t('migration.title')}</CardTitle>
        </div>
        <CardDescription>{t('migration.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium">{t('migration.important_notice')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t('migration.notice.1')}</li>
                <li>• {t('migration.notice.2')}</li>
                <li>• {t('migration.notice.3')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">{t('migration.steps_title')}</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                1
              </div>
              <span className="text-sm">{t('migration.step.1')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                2
              </div>
              <span className="text-sm">{t('migration.step.2')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                3
              </div>
              <span className="text-sm">{t('migration.step.3')}</span>
            </div>
          </div>
        </div>

        <Button onClick={() => setCurrentStep('bind-old')} className="w-full">
          {t('migration.start')}
        </Button>
      </CardContent>
    </Card>
  );

  const renderBindOldStep = () => (
    <Card className="dark:border-[#303030] dark:bg-[#171717]">
      <CardHeader>
        <CardTitle>{t('migration.bind_old_title')}</CardTitle>
        <CardDescription>{t('migration.bind_old_description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {oldAccount ? (
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{oldAccount.nickname}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <WeChatMigration type="old" onSuccess={refetch} />
          </div>
        )}

        {oldAccount && (
          <div className="flex gap-3">
            <Button
              onClick={() => setCurrentStep('bind-new')}
              className="flex-1"
            >
              {t('migration.next')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderBindNewStep = () => (
    <Card className="dark:border-[#303030] dark:bg-[#171717]">
      <CardHeader>
        <CardTitle>{t('migration.bind_new_title')}</CardTitle>
        <CardDescription>{t('migration.bind_new_description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {newAccount ? (
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{newAccount.nickname}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <WeChatMigration type="new" onSuccess={refetch} />
          </div>
        )}

        <div className="flex gap-3">
          {newAccount && (
            <Button
              onClick={handleMigration}
              disabled={isLoading}
              loading={isLoading}
              className="flex-1"
            >
              {t('migration.start_migration')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return renderIntroStep();
      case 'bind-old':
        return renderBindOldStep();
      case 'bind-new':
        return renderBindNewStep();
      default:
        return renderIntroStep();
    }
  };

  return (
    <div className="min-h-svh flex justify-center items-center">
      <div className="w-full max-w-md mx-auto">{renderStep()}</div>
    </div>
  );
}
