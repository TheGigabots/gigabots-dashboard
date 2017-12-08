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
}
