
import { Notification } from 'electron';

// display files added notification
exports.filesAdded = ( size: any) => {
    const notif: any = new Notification({
      title: 'Files added',
      body: `${ size } file(s) has been successfully added.`
    });

    notif.show();
};