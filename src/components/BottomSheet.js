export default function BottomSheet({ open, onClose, children }) {
  return (
    <div>
      <div
        class={`fixed h-screen w-screen top-0 left-0 transition-all duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        } backdrop-brightness-30`}
        onClick={onClose}
      >
        <div
          class={`fixed bottom-0 left-1/2 w-full max-w-xl p-4 -translate-x-1/2 transition-all duration-500 ${
            open ? "visible" : "invisible translate-y-1/2"
          } rounded-2xl bg-neutral-100`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
