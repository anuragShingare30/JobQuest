import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../@/components/ui/select';
import {
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
    FormControl
} from '../@/components/ui/form'
import { Input } from '../@/components/ui/input';



// FORM INPUT
function CustomFormField({ name, control }) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='capitalize'>{name}</FormLabel>
                    <FormControl>
                        <Input {...field} className='input input-bordered focus' autoFocus></Input>
                    </FormControl>
                    <FormMessage></FormMessage> 
                </FormItem>
            )} 
        >
        </FormField>
    );
}


// SELECT INPUT
function CustomFormSelect({ name, control, items, labelText }) {
    return ( 
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem> 
                    <FormLabel className='capitalize'>{labelText || name}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="w-[screen] btn btn-ghost btn-sm mb-10">
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup className='flex sm:flex-col  items-center gap-4 p-3'>
                                {
                                    items.map((item) => {   
                                        return (

                                            <SelectItem value={item} key={item} className='cursor-pointer'>{item}</SelectItem>

                                        );
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormMessage></FormMessage>
                </FormItem>
            )}
        >

        </FormField>
    );
}


export { CustomFormField, CustomFormSelect };