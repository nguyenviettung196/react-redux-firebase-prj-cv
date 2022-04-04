import { delay } from '../common/util/util';
import { sampleData } from './sampleData';

export function fetchSampleData() {
	return delay(500).then(function () {
		return Promise.resolve(sampleData);
	});
}
