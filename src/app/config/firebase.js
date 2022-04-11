import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBrau49t1ES8rA9CxbGRmtFPFcTLayqBXk',
	authDomain: 're-vents-97b2d.firebaseapp.com',
	projectId: 're-vents-97b2d',
	storageBucket: 're-vents-97b2d.appspot.com',
	messagingSenderId: '212758088837',
	appId: '1:212758088837:web:86f333c37703d2fdd9adec'
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
