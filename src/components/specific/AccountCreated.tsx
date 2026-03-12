import React from 'react';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import StatusScreen from '../../components/common/StatusScreen';

const AccountCreated: React.FC = () => {
  return (
    <ScreenWrapper>
      <StatusScreen
        type="success"
        title="ACCOUNT CREATED SUCCESSFULLY"
      />
    </ScreenWrapper>
  );
};

export default AccountCreated;