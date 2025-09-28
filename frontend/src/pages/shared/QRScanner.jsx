import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  QrCodeIcon,
  PhotoIcon,
  CameraIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  BeakerIcon,
  CubeIcon,
  XMarkIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

const QRScanner = () => {
  const [scanMode, setScanMode] = useState('camera') // 'camera' or 'upload'
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [recentScans, setRecentScans] = useState([
    {
      id: 1,
      type: 'drug',
      code: 'AMX-2025-001',
      data: { name: 'Amoxicillin', batch: 'B001', expiry: '2025-12-31' },
      timestamp: '2 minutes ago'
    },
    {
      id: 2,
      type: 'sample',
      code: 'MS-2025-045',
      data: { type: 'Milk Sample', source: 'Cow #123', collector: 'John Doe' },
      timestamp: '1 hour ago'
    }
  ])

  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Mock QR code scanning function
  const processQRCode = useCallback((imageData) => {
    // Simulate API call to decode QR
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock different types of QR codes
        const mockResults = [
          {
            type: 'drug',
            code: 'AMX-2025-' + Math.floor(Math.random() * 1000),
            data: {
              name: 'Amoxicillin',
              batch: 'B' + Math.floor(Math.random() * 1000),
              expiry: '2025-12-31',
              manufacturer: 'ABC Pharma',
              dosage: '500mg',
              mrl: '0.1 ppm'
            }
          },
          {
            type: 'sample',
            code: 'MS-2025-' + Math.floor(Math.random() * 1000),
            data: {
              type: 'Milk Sample',
              source: 'Cow #' + Math.floor(Math.random() * 500),
              collector: 'Sample Collector',
              location: 'Farm A-Block',
              collectionDate: new Date().toISOString().split('T')[0]
            }
          },
          {
            type: 'animal',
            code: 'ANI-2025-' + Math.floor(Math.random() * 1000),
            data: {
              name: 'Cow #' + Math.floor(Math.random() * 500),
              breed: 'Holstein',
              age: Math.floor(Math.random() * 8) + 2 + ' years',
              weight: Math.floor(Math.random() * 200) + 400 + 'kg',
              health: 'Good'
            }
          }
        ]
        
        const result = mockResults[Math.floor(Math.random() * mockResults.length)]
        resolve(result)
      }, 1500)
    })
  }, [])

  const startCamera = async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setIsScanning(true)
    } catch (err) {
      setError('Unable to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)
    
    try {
      setError(null)
      const result = await processQRCode(canvas.toDataURL())
      setScanResult(result)
      setRecentScans(prev => [result, ...prev.slice(0, 4)])
      stopCamera()
    } catch (err) {
      setError('No QR code detected. Please try again.')
    }
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setSelectedImage(file)
    setError(null)

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const result = await processQRCode(e.target.result)
        setScanResult(result)
        setRecentScans(prev => [result, ...prev.slice(0, 4)])
      } catch (err) {
        setError('No QR code found in the uploaded image.')
      }
    }
    reader.readAsDataURL(file)
  }

  const resetScanner = () => {
    setScanResult(null)
    setError(null)
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'drug': return CubeIcon
      case 'sample': return BeakerIcon
      case 'animal': return DocumentTextIcon
      default: return QrCodeIcon
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'drug': return 'bg-blue-500'
      case 'sample': return 'bg-purple-500'
      case 'animal': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <QrCodeIcon className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">QR Scanner</h1>
          </div>
          <p className="text-gray-600">Scan QR codes on drugs, samples, or animal tags</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Scanner Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Mode Selection */}
              <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                <button
                  onClick={() => {
                    setScanMode('camera')
                    resetScanner()
                  }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    scanMode === 'camera'
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <CameraIcon className="h-4 w-4" />
                  <span>Live Camera</span>
                </button>
                <button
                  onClick={() => {
                    setScanMode('upload')
                    stopCamera()
                  }}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    scanMode === 'upload'
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <PhotoIcon className="h-4 w-4" />
                  <span>Upload Image</span>
                </button>
              </div>

              {/* Scanner Content */}
              <div className="relative">
                {scanMode === 'camera' ? (
                  <div className="space-y-4">
                    {/* Camera View */}
                    <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                      />
                      
                      {/* QR Finder Overlay */}
                      {isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-64 border-2 border-green-400 rounded-lg relative">
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400 rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400 rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400 rounded-bl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400 rounded-br-lg"></div>
                            
                            {/* Scanning line animation */}
                            <motion.div
                              className="absolute left-0 right-0 h-0.5 bg-green-400"
                              initial={{ top: 0 }}
                              animate={{ top: '100%' }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear'
                              }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {!isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                          <div className="text-center text-white">
                            <CameraIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium mb-2">Camera Ready</p>
                            <p className="text-sm opacity-75">Tap "Start Camera" to begin scanning</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Camera Controls */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {!isScanning ? (
                        <button
                          onClick={startCamera}
                          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <CameraIcon className="h-5 w-5" />
                          <span>Start Camera</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={captureFrame}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                          >
                            <QrCodeIcon className="h-5 w-5" />
                            <span>Scan QR Code</span>
                          </button>
                          <button
                            onClick={stopCamera}
                            className="bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                          >
                            Stop
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Upload Area */}
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {selectedImage ? (
                        <div className="space-y-4">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                            className="max-h-64 mx-auto rounded-lg"
                          />
                          <div className="flex items-center justify-center space-x-2 text-green-600">
                            <CheckCircleIcon className="h-5 w-5" />
                            <span className="font-medium">Image uploaded successfully</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <PhotoIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload QR Code Image</h3>
                          <p className="text-gray-600 mb-4">Choose an image file containing a QR code</p>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Supported formats: JPG, PNG, WebP</p>
                            <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                          </div>
                        </>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <PhotoIcon className="h-5 w-5" />
                      <span>Choose Image</span>
                    </button>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
                  >
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scan Result */}
            <AnimatePresence>
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <div className={`p-2 ${getTypeColor(scanResult.type)} rounded-lg`}>
                        {React.createElement(getTypeIcon(scanResult.type), {
                          className: 'h-5 w-5 text-white'
                        })}
                      </div>
                      <span>Scan Result</span>
                    </h3>
                    <button
                      onClick={resetScanner}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ArrowPathIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">Code:</span>
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{scanResult.code}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(scanResult.data).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm text-gray-900 mt-1">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Record Action
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <InformationCircleIcon className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900">Scanning Tips</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Hold your device steady and ensure good lighting</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Position the QR code within the scanning frame</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>For best results, scan at arm's length distance</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Clean the camera lens if QR codes aren't scanning</p>
                </div>
              </div>
            </div>

            {/* Recent Scans */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Scans</h3>
              <div className="space-y-3">
                {recentScans.map((scan) => {
                  const Icon = getTypeIcon(scan.type)
                  return (
                    <div key={scan.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className={`p-2 ${getTypeColor(scan.type)} rounded-lg`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{scan.code}</p>
                        <p className="text-xs text-gray-500">{scan.timestamp}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRScanner