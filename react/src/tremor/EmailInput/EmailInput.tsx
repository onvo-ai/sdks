import React from 'react';
import { useState } from 'react';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';

export const EmailInput: React.FC<{ placeholder?: string, value: string[], onValueChange: (newEmails: string[]) => void; }> = ({ placeholder, value, onValueChange }) => {

    return (
        <ReactMultiEmail
            placeholder={placeholder || 'Input your email'}
            emails={value} className='!onvo-border-slate-200 dark:!onvo-border-slate-800 onvo-text-slate-900 dark:onvo-text-slate-50 !onvo-bg-white dark:!onvo-bg-slate-950 !onvo-py-0 !onvo-text-sm'
            onChange={(_emails: string[]) => {
                onValueChange(_emails);
            }}
            inputClassName='!onvo-shadow-none !onvo-text-slate-900 dark:!onvo-text-slate-50 !onvo-bg-white dark:!onvo-bg-slate-950 !onvo-text-sm'
            getLabel={(email, index, removeEmail) => {
                return (
                    <div data-tag key={index}>
                        <div data-tag-item>{email}</div>
                        <span data-tag-handle onClick={() => removeEmail(index)}>
                            ×
                        </span>
                    </div>
                );
            }}
        />
    );
}
