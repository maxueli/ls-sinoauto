// import { Injectable } from '@angular/c ore';
import { FormGroup } from '@angular/forms';
// @Injectable()
export class FormValidate {
    //自动验证
    public static onValueChanged(formGroup: FormGroup, errors: any) {
        // console.log(errors);
        // console.log(formGroup);
        formGroup.valueChanges.subscribe(data => {
            // console.log(data);
            for (const field in errors) {
                if (!errors[field]) {
                    return
                }
                errors[field].error = '';
                const control = formGroup.get(field);
                if (control && !control.valid && (control.touched || control.dirty)) {
                    // console.log(control);
                    const message = errors[field];
                    for (const key in control.errors) {
                        errors[field].error += message[key] + '';
                    }
                }
                // console.log(errors);
                //添加样式
                errors[field].class = {
                    'has-error': errors[field].error,
                    'has-success': control.dirty && !errors[field].error
                }
            }
        })
    }
    //自动调用（唯一的区别就是在在点击确定的时候可以自动的滚动到错误的地方）
    public static validate(formGroup: FormGroup, errors: any) {
        let errorField: string;
        for (const field in errors) {
            if (!errors[field]) {
                return
            }
            errors[field].error = '';
            const control = formGroup.get(field);
            if (control && !control.valid ) {
                errorField=errorField||field;
                const message = errors[field];
                for (const key in control.errors) {
                    errors[field].error += message[key] + '';
                }
            }
            //添加样式
            errors[field].class = {
                'has-error': errors[field].error,
                'has-success': control.dirty && !errors[field].error
            }
        }
        //在ionic2中不清楚能不能使用jquery 如果可以需要引入一下
        // if(errorField){
        //     jQuery(`form [formcontrolname='${errorField}']`)[0].scrollIntoView();
        // }
    }
}