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
                            <SelectTrigger className="w-[screen] btn btn-ghost btn-sm">
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup className='flex flex-row gap-10 p-1'>
                                {
                                    items.map((item) => {
                                        return (

                                            <SelectItem value={item} key={item} className='cursor-pointer p-2 mb-10'>{item}</SelectItem>

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