export class Scroll {
  mark(dom: string): void {
    const name = `scroll-${dom}`;
    const scrollContent = document.getElementById('maniContent');
    const position = scrollContent.scrollTop;
    window.localStorage.setItem(name, JSON.stringify(position));
  }
  move(dom: string) {
    const name = `scroll-${dom}`;
    const scrollContent = document.getElementById('maniContent');
    const position = JSON.parse(window.localStorage.getItem(name));
    if (position !== null && position !== 'null' && position !== '') {
      scrollContent.scrollTop = position - 0;
    } else {
      scrollContent.scrollTop = 0;
    }
  }
}
