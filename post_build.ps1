Remove-Item "../../smpo-root/src/se/*"-Recurse
Copy-Item "./build/*" -Destination "../../smpo-root/src/se/" -Recurse -force
