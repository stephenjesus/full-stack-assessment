function generatePartitionSums(partitionList) {
    // Determine the length of each partition
    const halfLength = partitionList.length >> 1;

    // Initialize maps to store sums for each partition count
    const firstPartitionSums = new Map();
    const secondPartitionSums = new Map();

    // Generate all possible partitions and their corresponding sums
    for (let i = 0; i < (1 << halfLength); ++i) {
        let firstSum = 0, firstCount = 0;
        let secondSum = 0, secondCount = 0;

        // Iterate through the partitionList to compute sums for each partition
        for (let j = 0; j < halfLength; ++j) {
            if ((i & (1 << j)) !== 0) {
                firstSum += partitionList[j];
                ++firstCount;
                secondSum += partitionList[halfLength + j];
                ++secondCount;
            } else {
                firstSum -= partitionList[j];
                secondSum -= partitionList[halfLength + j];
            }
        }

        // Store the sums for each partition count in the respective maps
        firstPartitionSums.set(firstCount, (firstPartitionSums.get(firstCount) || new Set()).add(firstSum));
        secondPartitionSums.set(secondCount, (secondPartitionSums.get(secondCount) || new Set()).add(secondSum));
    }

    return { firstPartitionSums, secondPartitionSums };
}

function findMinimumAbsoluteDifference(firstPartitionSums, secondPartitionSums, halfLength) {
    // Initialize the minimum absolute difference variable
    let minAbsoluteDiff = Number.MAX_VALUE;

    // Find the minimum absolute difference between partition sums
    for (let i = 0; i <= halfLength; ++i) {
        const firstPartitionValues = [...firstPartitionSums.get(i)];
        const secondPartitionValues = [...secondPartitionSums.get(halfLength - i)];

        // Sort the partition sums for comparison
        firstPartitionValues.sort((a, b) => a - b);
        secondPartitionValues.sort((a, b) => a - b);

        // Iterate through the sums to find the minimum absolute difference
        for (const valueA of firstPartitionValues) {
            let left = 0, right = secondPartitionValues.length - 1;
            const valueB = -valueA;

            // Use binary search to find the closest sum in the other partition
            while (left < right) {
                const mid = (left + right) >> 1;
                if (secondPartitionValues[mid] >= valueB) {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }

            // Update the minimum absolute difference based on the current sums
            minAbsoluteDiff = Math.min(minAbsoluteDiff, Math.abs(valueA + secondPartitionValues[left]));
            if (left > 0) {
                minAbsoluteDiff = Math.min(minAbsoluteDiff, Math.abs(valueA + secondPartitionValues[left - 1]));
            }
        }
    }

    return minAbsoluteDiff;
}

function minimumDifference(partitionList) {
    // Determine the length of each partition
    const halfLength = partitionList.length >> 1;

    // Generate partition sums
    const { firstPartitionSums, secondPartitionSums } = generatePartitionSums(partitionList);

    // Find the minimum absolute difference between partition sums
    return findMinimumAbsoluteDifference(firstPartitionSums, secondPartitionSums, halfLength);
}


module.exports = { minimumDifference }