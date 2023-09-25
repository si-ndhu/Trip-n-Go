// Author: Rahul Saliya

const Spacer = ({ ...props }) => {
    const { flex, width, height } = props;

    const style = {};

    if (flex) {
        style.flex = flex;
    }

    if (width) {
        style.width = width;
    }

    if (height) {
        style.height = height;
    }

    if (!flex && !width && !height) {
        style.flex = 1;
    }

    return <div style={style}></div >
}

export default Spacer;