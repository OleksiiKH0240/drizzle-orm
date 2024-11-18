export const fastCartesianProduct = (sets: (number | string | boolean | object)[][], index: number) => {
	const resultList = [];
	let currSet: (typeof sets)[number];
	let element: (typeof sets)[number][number];

	for (let i = sets.length - 1; i >= 0; i--) {
		currSet = sets[i]!;
		element = currSet[index % currSet.length]!;
		resultList.unshift(element);
		index = Math.floor(index / currSet.length);
	}

	return resultList;
};

/**
 * @param weights positive number in range [0, 1], that represents probabilities to choose index of array. Example: weights = [0.2, 0.8]
 * @param [accuracy=100] approximate number of elements in returning array
 * @returns Example: with weights = [0.2, 0.8] and accuracy = 10 returning array of indices gonna equal this: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
 */
export const getWeightedIndices = (weights: number[], accuracy = 100) => {
	const weightsSum = weights.reduce((acc, currVal) => acc + currVal, 0);
	if (weightsSum !== 1) {
		throw new Error(`sum of all weights don't equal to 1; ${weightsSum} !== 1`);
	}

	// const accuracy = 100;
	const weightedIndices: number[] = [];
	for (const [index, weight] of weights.entries()) {
		const ticketsNumb = Math.floor(weight * accuracy);
		weightedIndices.push(...Array.from<number>({ length: ticketsNumb }).fill(index));
	}

	return weightedIndices;
};

export const generateHashFromString = (s: string) => {
	let hash = 0;
	// p and m are prime numbers
	const p = 53;
	const m = 28871271685163;

	for (let i = 0; i < s.length; i++) {
		hash += ((s.codePointAt(i) || 0) * Math.pow(p, i)) % m;
	}

	return hash;
};

/**
 * @param param0.template example: "#####" or "#####-####"
 * @param param0.values example: ["3", "2", "h"]
 * @param param0.defaultValue example: "0"
 * @returns
 */
export const fillTemplate = ({ template, placeholdersCount, values, defaultValue = ' ' }: {
	template: string;
	placeholdersCount?: number;
	values: string[];
	defaultValue?: string;
}) => {
	if (placeholdersCount === undefined) {
		const iterArray = [...template.matchAll(/#/g)];
		placeholdersCount = iterArray.length;
	}

	const diff = placeholdersCount - values.length;
	if (diff > 0) {
		values.unshift(...Array.from<string>({ length: diff }).fill(defaultValue));
	}

	let resultStr = '', valueIdx = 0;
	for (const si of template) {
		if (si === '#') {
			resultStr += values[valueIdx];
			valueIdx += 1;
			continue;
		}
		resultStr += si;
	}

	return resultStr;
};

// let count = 0;
// for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//         for (let k = 0; k < 3; k++) {
//             console.log([i, j, k], "===", fastCartesianProduct([[0, 1, 2], [0, 1, 2], [0, 1, 2]], count));
//             count++;
//         }

//     }
// }