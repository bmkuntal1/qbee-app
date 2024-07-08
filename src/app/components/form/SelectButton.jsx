import { convertAttributesToObject } from '../../helpers/utils';

const SelectButton = ({ value, options, onChange }) => {
    const selectedItem = options?.find(item => item.value == value);
    const color = () => {
        if (selectedItem?.attributes) {
            const attrib = convertAttributesToObject(selectedItem?.attributes);
            return attrib?.color ? attrib.color : 'primary';
        }
        return 'primary';
    }
    return (
        <div className="dropdown">
            <button className={`btn btn-${color()} dropdown-toggle`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedItem?.label}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {options?.map((item, index) => (
                    <a key={index} className={`dropdown-item ${item.value == value ? 'active' : ''}`} href="#" onClick={() => onChange(item.value)}>{item.label}</a>
                ))}
            </ul>
        </div>
    )
}

export default SelectButton