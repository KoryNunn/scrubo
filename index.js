var m = require('mithril');

var state = {
    armLength: 300,
    shockToPivotLength: 200,
    topOfTyreToScrub: 100,
    damperTravel: 100,
    desiredTyreToScrubGap: 10
}

function maths() {
    var geometryRatio = 1 / state.armLength * state.shockToPivotLength;
    var travel = state.damperTravel / geometryRatio;
    return ((state.topOfTyreToScrub + state.desiredTyreToScrubGap) - travel) * geometryRatio;
}

function field() {
    return {
        view: ({ attrs }) => {
            var { property, label, placeholder } = attrs;

            return m('field',
                m('label', label),
                m('input', {
                    placeholder,
                    value: state[property],
                    oninput: (event) => {
                        state[property] = event.target.value;
                        rerender();
                    }
                })
            )
        }
    }
}

function rerender(){
    m.render(window.document.body,
        m('div',
            m('h1', 'Coilover lower mount adjustment calculator'),
            m(field, {
                label: 'A: Length of the suspension arm from chassis pivot to hub pivot.',
                placeholder: 'mm',
                property: 'armLength'
            }),
            m(field, {
                label: 'B: Distance from chassis pivot to strut attachment pivot.',
                placeholder: 'mm',
                property: 'shockToPivotLength'
            }),
            m(field, {
                label: 'C: Distance from the top of the tyre to where it would scrub',
                placeholder: 'mm',
                property: 'topOfTyreToScrub'
            }),
            m(field, {
                label: 'X: How much travel the damper has',
                placeholder: 'mm',
                property: 'damperTravel'
            }),
            m(field, {
                label: 'How much of a gap you want to leave between tyre and chassis when you hit the bumpstop',
                placeholder: 'mm',
                property: 'desiredTyreToScrubGap'
            }),
            m('div',
                `Move the lower mount (Adjust bump height) ${Math.sign(maths()) < 0 ? 'down' : 'up'} by ${Math.round(Math.abs(maths()))}mm`
            ),
            m('img', { src: 'Untitled.png' })
        )
    )
}

window.addEventListener('DOMContentLoaded', () => {

    rerender();
})