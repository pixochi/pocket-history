import { AdMobInterstitial } from 'expo';

import { 
	INIT_INTERSTITIAL, 
	SHOW_INTERSTITIAL 
} from '../../constants/actionTypes';
import CONFIG from '../../constants/config';


export const initInterstitial = () => {
	AdMobInterstitial.setAdUnitID(CONFIG.common.adMob.testInterstitial);
  AdMobInterstitial.setTestDeviceID("EMULATOR");
	return { type: INIT_INTERSTITIAL }
}

export const showInterstitial = (counterName) => {
	AdMobInterstitial.requestAd(() => {
		AdMobInterstitial.showAd();
	});

	return { type: SHOW_INTERSTITIAL, counterName }
}