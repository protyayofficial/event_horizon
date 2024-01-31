const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen w-full pattern-isometric pattern-blue-50 pattern-bg-white 
    pattern-size-8 pattern-opacity-100">
      {children}
    </div>
  )
}

export default Layout;