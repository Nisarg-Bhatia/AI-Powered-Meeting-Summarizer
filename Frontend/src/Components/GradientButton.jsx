const GradientButton = ({ children }) => (
    <button className="relative group w-full mt-2">
        <div className="relative w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 rounded-md flex items-center justify-center font-bold text-white transition-all duration-200 active:scale-95">
            {children}
        </div>
    </button>
);

export default GradientButton;