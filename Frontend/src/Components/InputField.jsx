const InputField = ({ label, type, placeholder, icon, value, onChange }) => (
  <div className="mb-5 group/field">
    <label className="block text-sm font-medium text-gray-300 mb-2 ml-1 transition-colors duration-300 group-focus-within/field:text-emerald-400">{label}</label>
    <div className="relative group">
      {/* Icon displayed on the left */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-all duration-300 group-focus-within:scale-110">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3.5 bg-[#262626] border border-gray-700 rounded-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:shadow-lg focus:shadow-emerald-500/20 text-white placeholder-gray-500 transition-all duration-300 outline-none hover:border-gray-600 transform focus:scale-[1.01]"
      />
    </div>
  </div>
);
export default InputField;