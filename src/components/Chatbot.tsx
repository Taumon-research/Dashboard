export default function Chatbot() {
  return (
    <div className="h-full bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Chatbot</h2>
      <div className="h-64 bg-white border border-gray-200 rounded-md p-2 overflow-y-auto">
        {/* Chat messages will go here */}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}
