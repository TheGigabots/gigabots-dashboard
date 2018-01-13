export default class Motors {

    /**
     *  Convert the editor speed (in percent) to rotationSpeed
     * @param percentSpeed
     * @returns {number}
     */
    static toRotationSpeed(percentSpeed, reverse) {
        let rot = Math.round((percentSpeed * 1024) / 100);

        if (reverse) {
            rot *= -1;
        }
        return rot;
    }

    /**
     * Convert a number in srcRange to number in targetRange
     * @param srcValue
     * @param srcMin
     * @param srcMax
     * @param targetMin
     * @param targetMax
     * @returns {*}
     */
    static convertRange(srcValue,  srcMin, srcMax, targetMin, targetMax,) {
        let percent = (srcValue - srcMin) / (srcMax - srcMin);
        let outputX = percent * (targetMax - targetMin) + targetMin;
        return outputX;
    }

}
