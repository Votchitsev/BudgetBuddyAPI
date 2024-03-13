declare global {
    interface Date {
        daysInMonth(): number;
    }
  }

export const initPrototypes = () => {
    Date.prototype.daysInMonth = function () {
        return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate()
    }
}
