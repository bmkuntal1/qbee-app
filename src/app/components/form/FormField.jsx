
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

const FormField = ({ type, name, label, hideLabel, register, errors, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);
    if (type === 'password') {
        return (
            <div className={`form-group ${!hideLabel ? 'mb-3' : ''}`}>
                {!hideLabel && <label htmlFor={name} className="form-label">{label}</label>}
                <div className="input-group">
                    <input type={showPassword ? 'text' : 'password'} id={name} className={`form-control ${errors[name] && 'is-invalid'}`} {...register(name)} />
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                    </button>
                </div>
                {errors[name] && <div className="invalid-feedback d-block">{errors[name].message}</div>}
            </div>
        )
    }
    else if (type === 'select') {
        const options = rest.options || [];
        return (
            <div className={`form-group ${!hideLabel ? 'mb-3' : ''}`}>
                {!hideLabel && <label htmlFor={name} className="form-label">{label}</label>}
                <select id={name} className={`form-control ${errors[name] && 'is-invalid'}`} {...register(name)}>
                    <option value="" className="text-muted">Select {label}</option>
                    {options && options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {errors[name] && <div className="invalid-feedback d-block">{errors[name].message}</div>}
            </div>
        )
    }
    else if (type === 'react-select') {
        if (!rest.control) throw new Error('react-select requires control prop');
        const options = rest.options || [];
        return (
            <div className={`form-group ${!hideLabel ? 'mb-3' : ''}`}>
                {!hideLabel && <label htmlFor={name} className="form-label">{label}</label>}
                <Controller
                    name={name}
                    control={rest.control}
                    render={({ field: { onChange, value, ref } }) => rest?.isMulti ?
                        (
                            <Select
                                isMulti
                                inputRef={ref}
                                options={options}
                                onChange={(val) =>onChange(val.map(v => v.value).join(','))}
                                value={options.filter(option => value?.includes(option?.value))}
                                placeholder={`Select ${label}`} />
                        ) :
                        (
                            <Select
                                inputRef={ref}
                                options={options}
                                onChange={(val) => onChange(val.value)}
                                value={options.find(option => option.value === value)}
                                placeholder={`Select ${label}`}
                                isClearable={rest.isClearable}
                            />
                        )}
                />
                {errors[name] && <div className="invalid-feedback d-block">{errors[name].message}</div>}
            </div>
        )
    } else if (type === 'textarea') {
        const { rows = 3 } = rest;
        return (
            <div className={`form-group ${!hideLabel ? 'mb-3' : ''}`}>
                {!hideLabel && <label htmlFor={name} className="form-label">{label}</label>}
                <textarea id={name} rows={rows} className={`form-control ${errors[name] && 'is-invalid'}`} {...register(name)}></textarea>
                {errors[name] && <div className="invalid-feedback d-block">{errors[name].message}</div>}
            </div>
        )
    }
    else if (type === 'checkbox') {
        return (
            <div className="form-check mb-3">
                <input type="checkbox" id={name} className={`form-check-input ${errors[name] && 'is-invalid'}`} {...register(name)} />
                <label htmlFor={name} className="form-check-label">{label}</label>
                {errors[name] && <div className="invalid-feedback d-block">{errors[name].message}</div>}
            </div>
        )
    }
    else if (type === 'radio') {
        const options = rest.options || [];
        return (
            <div className="mb-3">
                {!hideLabel && <label className="form-label">{label}</label>}
                {options && rest.options.map((option, index) => (
                    <div key={index} className="form-check form-check-inline">
                        <input type="radio" id={`${name}${index}`} className={`form-check-input ${errors[name] ? 'is-invalid':''}`} {...register(name)} value={option.value}/>
                        <label htmlFor={`${name}${index}`} className="form-check-label">{option.label}</label>
                    </div>
                ))}
                {errors[name] && <div className="invalid-feedback d-block">{errors[name].message}</div>}
            </div>
        )
    }
    else if (type === 'file') {
        return (
            <div className={`form-group ${!hideLabel ? 'mb-3' : ''}`}>
                {!hideLabel && <label htmlFor={name} className="form-label">{label}</label>}
                <input type="file" id={name} className={`form-control ${errors[name] && 'is-invalid'}`} {...register(name)} />
                {errors[name] && <div className="invalid-feedback d-block">{errors[name].message}</div>}
            </div>
        )
    }
    return (
        <div className={`form-group ${!hideLabel ? 'mb-3' : ''}`}>
            {!hideLabel && <label htmlFor={name} className="form-label">{label}</label>}
            <input type={type} id={name} className={`form-control ${errors[name] && 'is-invalid'}`} {...register(name)} />
            {errors[name] && <div className="invalid-feedback d-block">{errors[name].message}</div>}
        </div>
    )
}

export default FormField