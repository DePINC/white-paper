const { add, finalize, fontSize, arrowLine, rect, fillRect, label, labelRect, fillCircle } = require('./lib/tikzpicture.js');

const timePoint = (x, y, lineWidth, width, height, time, title, desc, color) => {
    const MARGIN = 0.2;
    return () => {
        let script = '';
        script += fontSize('normalsize')().script;
        script += arrowLine(x, y, x + lineWidth, y, color)().script;
        if (time) {
            script += label(x, y, time, color, 'east')().script;
        }
        script += rect(x + lineWidth, y - height / 2, width, height, color, true)().script;
        script += label(x + lineWidth + MARGIN, y + height / 2 - MARGIN, title, color, 'north west')().script;
        script += fontSize('tiny')().script;
        script += label(x + lineWidth + MARGIN, y - height / 2 + MARGIN, desc, color, 'south west')().script;
        return {
            script,
            props: { x, y, title, desc, color },
        }
    }
}

const roadMap = (entries) => {
    const ENTRY_OFFSET_Y = 1;
    const ENTRY_MARGIN = 0.3;
    const LINE_WIDTH = 3;
    const WIDTH = 5.5;
    return () => {
        let script = '';
        let y = ENTRY_OFFSET_Y;
        for (let i = 0; i < entries.length; ++i) {
            y += entries[i].height / 2;
            script += timePoint(0, y, LINE_WIDTH, WIDTH, entries[i].height, entries[i].time, entries[i].title, entries[i].desc, 'black')().script;
            y += entries[i].height / 2 + ENTRY_MARGIN;
        }
        script += arrowLine(0, 0, 0, y, 'black', true)().script;
        script += fillCircle(0, y, 0.1, 'black', '1pt')().script;
        return {
            script,
            props: null
        }
    }
}

const entries = [
    {
        time: '2025',
        title: '\\textbf{Fusion Consensus}',
        desc: 'DePINC is committed to building a \\\\flexible, scalable and integrated \\\\decentralized protocol ecosystem to meet \\\\future challenges and opportunities.',
        height: 2.2,
    },
    {
        time: 'Q1, 2023',
        title: '\\textbf{PoST Consensus}',
        desc: 'In 2023, DePINC will be compatible \\\\with Chia\'s old agreement documents \\\\for mining.',
        height: 2,
    },
]

add(roadMap(entries));

console.log(finalize());
