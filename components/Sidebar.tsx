export function Sidebar() {
  return (
    <aside className="w-80 bg-gray-50 border-l border-gray-200 p-6 hidden lg:block">
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 h-64 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-sm mb-2">Advertisement</div>
            <div className="text-xs text-gray-400">300x250</div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 h-32 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-sm mb-2">Advertisement</div>
            <div className="text-xs text-gray-400">300x100</div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Popular Builds</h3>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-gray-50 rounded">Gaming Beast - $2,500</div>
            <div className="p-2 bg-gray-50 rounded">Content Creator - $1,800</div>
            <div className="p-2 bg-gray-50 rounded">Budget Gaming - $800</div>
          </div>
        </div>
      </div>
    </aside>
  );
}