export default function urlChecker(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}