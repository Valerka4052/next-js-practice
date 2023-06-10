'use client'

export const MenuItem = ({ label, onClick }) => {
    return (
        <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
            {label}
        </div>
    );
};

